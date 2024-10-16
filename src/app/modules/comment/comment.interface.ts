import { ObjectId } from "mongodb";

export interface TComment {
  _id: ObjectId;
  postId: ObjectId; // Reference to Post
  userId: ObjectId; // Reference to User
  content: string; // Content of the comment
  createdAt: Date; // Comment creation date
  updatedAt: Date; // Last update date
  parentCommentId?: ObjectId; // Optional reference to another Comment for replies
}
