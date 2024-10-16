import mongoose, { Schema } from 'mongoose';
import { TVerification } from './verification.interface';

// Define an interface representing a Verification document

// Define the Verification schema
const VerificationSchema: Schema<TVerification> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Verification model
const VerificationModel = mongoose.model<TVerification>('Verification', VerificationSchema);

// Export the Verification model
export default VerificationModel;