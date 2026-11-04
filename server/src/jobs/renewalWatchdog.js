import cron from "node-cron";

import { sendRenewalAlert } from "../../utils/mailService.js";
import subscriptionsModel from "../models/subscriptionsModel.js";
import systemMetaModel from "../models/systemMetaModel.js";
let isRunning = false;

const getLastRunDate = async () => {
  const meta = await systemMetaModel.findOne({ key: "watchdog_last_run" });
  return meta ? meta.value : null;
};

const setLastRunDate = async (dateStr) => {
  await systemMetaModel.findOneAndUpdate(
    { key: "watchdog_last_run" },
    { value: dateStr },
    { upsert: true, returnDocument: "after" },
  );
};

export const runWatchdogCheck = async () => {
  if (isRunning) {
    console.log(
      "⚠️ Watchdog check already in progress, skipping overlapping run.",
    );
    return { success: false, reason: "Already running" };
  }

  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const lastRun = await getLastRunDate();

    if (lastRun === todayStr) {
      console.log(" Watchdog already executed today. Skipping.");
      return { success: true, skipped: true };
    }

    isRunning = true;
    console.log(" Running Finora Daily Renewal Watchdog...");

    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 3);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const upcomingSubs = await subscriptionsModel
      .find({
        status: "active",
        dueDate: {
          $gte: today,
          $lte: endOfDay,
        },
      })
      .populate("userId");

    for (const sub of upcomingSubs) {
      if (sub.userId && sub.userId.email) {
        await sendRenewalAlert(sub.userId.email, sub);
      }
    }

    console.log(
      `Watchdog check completed. Processed ${upcomingSubs.length} renewals.`,
    );

    await setLastRunDate(todayStr);

    return { success: true, processedCount: upcomingSubs.length };
  } catch (error) {
    console.error("Error in Renewal Watchdog check:", error);
    throw error;
  } finally {
    isRunning = false;
  }
};

export const initRenewalWatchdog = () => {
  cron.schedule("2 8 * * *", async () => {
    await runWatchdogCheck();
  });

  cron.schedule("*/30 * * * *", async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const todayStr = now.toISOString().split("T")[0];

    const lastRun = await getLastRunDate();

    if (
      currentHour >= 8 &&
      currentMinute >= 30 &&
      lastRun !== todayStr &&
      !isRunning
    ) {
      console.log(" Catch-up watchdog triggered (missed morning execution)...");
      await runWatchdogCheck();
    }
  });
};
