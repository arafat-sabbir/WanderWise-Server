import { ObjectId } from "mongodb";

export interface TPayment {
  _id: ObjectId;
  user: ObjectId; // Reference to User
  amount: number; // Amount paid
  paymentMethod: string; // Aamarpay, Stripe, etc.
  status: string; // e.g., "completed", "pending"
  createdAt: Date; // Payment date
}
