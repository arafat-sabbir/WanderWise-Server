import mongoose, { Schema } from 'mongoose';
import { TPost } from './post.interface';

// Define an interface representing a Post document

// Define the Post schema
const PostSchema: Schema<TPost> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Post model
const PostModel = mongoose.model<TPost>('Post', PostSchema);

// Export the Post model
export default PostModel;