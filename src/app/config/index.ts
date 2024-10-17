import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env:process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  payment_url:process.env.PAYMENT_URL,
  signature_key:process.env.SIGNATURE_KEY,
  store_id:process.env.STORE_ID,
  frontend_url:process.env.FRONTEND_URL,
  backend_url:process.env.BACKEND_URL,
};
