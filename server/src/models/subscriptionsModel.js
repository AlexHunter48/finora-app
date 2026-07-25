import mongoose from "mongoose";

const subscriptionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Entertainment",
        "Music",
        "Productivity",
        "Health",
        "Education",
        "Other",
      ],
    },

    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "NGN",
    },
    frequency: {
      type: String,
      required: true,
      enum: ["monthly", "weekly", "yearly"],
      default: "monthly",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "paused"],
      default: "active",
    },
    isAutoDetected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Subscription", subscriptionsSchema);
