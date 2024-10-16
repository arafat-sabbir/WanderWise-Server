import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

// Define an interface representing a User document

// Define the User schema
const UserSchema: Schema<TUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },
  { timestamps: true, versionKey: false }
);

// Create the User model
const UserModel = mongoose.model<TUser>('User', UserSchema);

// Export the User model
export default UserModel;

