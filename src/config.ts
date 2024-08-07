import dotenv from 'dotenv';

dotenv.config();


export const db_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const jwt_config = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
};