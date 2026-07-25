import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "NGN",
    },
    narration: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Subscriptions",
        "Food & Dining",
        "Transport",
        "Shopping",
        "Health",
        "Education",
        "Others",
      ],
      default: "Others",
    },
    date: {
      type: Date,
      required: true,
    },
    monoTransactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isSubscription: {
      type: Boolean,
      default: false,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Transaction", transactionSchema);
