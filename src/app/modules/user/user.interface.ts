/**
 * Type definition for User.
 *
 * This type defines the structure of a single user object.
 * @interface TUser
 */
export interface TUser {
  name: string;
  email: string;
  password: string;
  photo: string;
  isVerified: boolean;
  role:"user" | "admin"
}

