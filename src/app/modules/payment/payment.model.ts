import mongoose, { Schema } from 'mongoose';
import { TPayment } from './payment.interface';

// Define an interface representing a Payment document

// Define the Payment schema
const PaymentSchema: Schema<TPayment> = new Schema(
  {
    amount: {
      type: Number,
      default: 500,
    },
    paymentMethod: {
      type: String,
      default: 'Aamarpay',
    },
    status: {
      type: String,
      default: 'pending',
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true, versionKey: false }
);

// Create the Payment model
const PaymentModel = mongoose.model<TPayment>('Payment', PaymentSchema);

// Export the Payment model
export default PaymentModel;

