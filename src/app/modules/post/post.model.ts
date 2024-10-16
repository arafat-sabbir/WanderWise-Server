import mongoose, { Schema } from 'mongoose';
import { TPost } from './post.interface';

// Define an interface representing a Post document

// Define the Post schema
const PostSchema: Schema<TPost> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    downvotes: {
      type: [String],
      required: true,
    },
    upvotes: {
      type: [String],
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create the Post model
const PostModel = mongoose.model<TPost>('Post', PostSchema);

// Export the Post model
export default PostModel;

