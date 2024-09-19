import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    paymentType: { type: String, required: true, enum: ["card", "cash"] },
    category: {
      type: String,
      required: true,
      enum: ["saving", "expense", "investment"],
    },
    location: { type: String, required: true },
    date: { type: Date },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
