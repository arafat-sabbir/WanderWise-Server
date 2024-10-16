/**
 * Type definition for User.
 *
 * This type defines the structure of a single user object.
 * @interface TUser
 */
import { ObjectId } from "mongodb";

export interface TUser {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  profilePicture?: string; // URL to the profile picture
  bio?: string; // Short biography
  isVerified: boolean; // If the user is verified
  followers: ObjectId[]; // List of User IDs that follow this user
  following: ObjectId[]; // List of User IDs that this user follows
  role: string;
}

