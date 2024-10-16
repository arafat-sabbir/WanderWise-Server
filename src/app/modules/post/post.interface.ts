import { ObjectId } from "mongodb";

export interface TPost {
  _id: ObjectId;
  userId: ObjectId; // Reference to User
  title: string; // Title of the post
  content: string; // Rich text content or Markdown
  images?: string[]; // Array of image URLs
  category: string; // Category of the post (Adventure, Business Travel, etc.)
  tags?: string[]; // Tags associated with the post
  isPremium: boolean; // If the post is premium content
  upvotes: ObjectId[]; // List of User IDs who upvoted the post
  downvotes: ObjectId[]; // List of User IDs who downvoted the post
  createdAt: Date; // Post creation date
  updatedAt: Date; // Last update date
}
