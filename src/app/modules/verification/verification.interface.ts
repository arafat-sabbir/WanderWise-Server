import { ObjectId } from "mongodb";

export interface TVerification {
  _id: ObjectId;
  userId: ObjectId; // Reference to User
  isVerified: boolean; // If the user is verified
  verificationDate?: Date; // Date when verified
  paymentId: ObjectId; // Reference to Payment for verification fee
}
