import subscriptionsModel from "../src/models/subscriptionsModel.js";

const SUBSCRIPTION_PATTERNS = [
  {
    name: "ChatGPT Plus",
    keywords: ["chatgpt", "openai"],
    category: "Productivity",
    defaultAmount: 30000,
    currency: "USD",
  },
  {
    name: "GitHub Copilot",
    keywords: ["github", "copilot"],
    category: "Productivity",
    defaultAmount: 15000,
    currency: "USD",
  },
  {
    name: "Cursor AI",
    keywords: ["cursor"],
    category: "Productivity",
    defaultAmount: 30000,
    currency: "USD",
  },
  {
    name: "Claude Pro",
    keywords: ["claude", "anthropic"],
    category: "Productivity",
    defaultAmount: 30000,
    currency: "USD",
  },
  {
    name: "Vercel Pro",
    keywords: ["vercel"],
    category: "Productivity",
    defaultAmount: 32000,
    currency: "USD",
  },
  {
    name: "AWS",
    keywords: ["amazon web services", "aws"],
    category: "Productivity",
    defaultAmount: 45000,
    currency: "USD",
  },
  {
    name: "DigitalOcean",
    keywords: ["digitalocean"],
    category: "Productivity",
    defaultAmount: 12000,
    currency: "USD",
  },
  {
    name: "Netlify",
    keywords: ["netlify"],
    category: "Productivity",
    defaultAmount: 28000,
    currency: "USD",
  },
  {
    name: "Figma",
    keywords: ["figma"],
    category: "Productivity",
    defaultAmount: 22000,
    currency: "USD",
  },
  {
    name: "Adobe CC",
    keywords: ["adobe"],
    category: "Productivity",
    defaultAmount: 42000,
    currency: "USD",
  },
  {
    name: "iCloud+",
    keywords: ["icloud", "apple.com/bill"],
    category: "Productivity",
    defaultAmount: 1200,
    currency: "USD",
  },
  {
    name: "Netflix",
    keywords: ["netflix", "nflx"],
    category: "Entertainment",
    defaultAmount: 5000,
    currency: "NGN",
  },
  {
    name: "Spotify",
    keywords: ["spotify"],
    category: "Music",
    defaultAmount: 900,
    currency: "NGN",
  },
  {
    name: "DStv",
    keywords: ["dstv", "multichoice"],
    category: "Entertainment",
    defaultAmount: 12000,
    currency: "NGN",
  },
  {
    name: "YouTube Premium",
    keywords: ["youtube"],
    category: "Entertainment",
    defaultAmount: 1500,
    currency: "NGN",
  },
];

export const runSubscriptionDetectionEngine = async (
  userId,
  transactions = [],
) => {
  const detectedSubscriptions = [];

  for (const tx of transactions) {
    const narration = [
      tx.narration,
      tx.description,
      tx.title,
      tx.merchant,
      tx.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const rawAmount =
      typeof tx.amount === "number" ? tx.amount : parseFloat(tx.amount) || 0;
    const amount = Math.abs(rawAmount);
    const txDate = new Date(tx.date || tx.createdAt || Date.now());

    const matchedPattern = SUBSCRIPTION_PATTERNS.find((pattern) =>
      pattern.keywords.some((keyword) => narration.includes(keyword)),
    );

    if (matchedPattern) {
      const nextDueDate = new Date(txDate);
      nextDueDate.setDate(nextDueDate.getDate() + 30);

      const sub = await subscriptionsModel.findOneAndUpdate(
        { userId, name: matchedPattern.name },
        {
          userId,
          name: matchedPattern.name,
          category: matchedPattern.category,
          amount: amount || matchedPattern.defaultAmount,
          currency: matchedPattern.currency,
          frequency: "monthly",
          dueDate: nextDueDate,
          isAutoDetected: true,
          status: "active",
        },
        { upsert: true, new: true },
      );

      detectedSubscriptions.push(sub);
    }
  }

  return detectedSubscriptions;
};
