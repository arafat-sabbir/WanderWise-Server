import mongoose, { Schema } from 'mongoose';
import { TComment } from './comment.interface';

// Define an interface representing a Comment document

// Define the Comment schema
const CommentSchema: Schema<TComment> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Comment model
const CommentModel = mongoose.model<TComment>('Comment', CommentSchema);

// Export the Comment model
export default CommentModel;