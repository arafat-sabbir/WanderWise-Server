import mongoose, { Schema } from 'mongoose';
import { TPayment } from './payment.interface';

// Define an interface representing a Payment document

// Define the Payment schema
const PaymentSchema: Schema<TPayment> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Payment model
const PaymentModel = mongoose.model<TPayment>('Payment', PaymentSchema);

// Export the Payment model
export default PaymentModel;