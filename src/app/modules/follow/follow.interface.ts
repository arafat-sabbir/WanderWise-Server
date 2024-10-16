import { ObjectId } from "mongodb";

export interface Follow {
  _id: ObjectId;
  followerId: ObjectId; // Reference to User (the follower)
  followingId: ObjectId; // Reference to User (the followed)
  createdAt: Date; // Follow date
}
