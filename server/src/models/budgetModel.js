import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Subscriptions",
        "Food & Dining",
        "Transport",
        "Shopping",
        "Health",
        "Education",
        "Utilities & Power",
        "Development & SaaS",
        "Entertainment",
        "Others",
      ],
    },
    limit: {
      type: Number,
      required: true,
      min: [0, "Budget limit cannot be negative"],
    },
    period: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
  },
  {
    timestamps: true,
  },
);

budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

export default mongoose.model("Budget", budgetSchema);
