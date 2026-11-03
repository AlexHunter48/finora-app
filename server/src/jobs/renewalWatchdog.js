import cron from "node-cron";

import { sendRenewalAlert } from "../../utils/mailService.js";
import subscriptionsModel from "../models/subscriptionsModel.js";

export const initRenewalWatchdog = () => {
  cron.schedule("0 8 * * *", async () => {
    console.log(" Running Finora Daily Renewal Watchdog...");

    try {
      const today = new Date();

      const targetDate = new Date();
      targetDate.setDate(today.getDate() + 3);

      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      const upcomingSubs = await subscriptionsModel
        .find({
          status: "active",
          dueDate: {
            $gte: startOfDay,
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
    } catch (error) {
      console.error("Error in Renewal Watchdog cron:", error);
    }
  });
};
