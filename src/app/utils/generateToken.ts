import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
 const generateToken = async (
  jwtPayload: { id: string|Types.ObjectId; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export default generateToken;
