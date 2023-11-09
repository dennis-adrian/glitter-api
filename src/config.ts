import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
  },
}));
