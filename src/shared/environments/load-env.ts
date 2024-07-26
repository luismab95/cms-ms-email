import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    msLogs: process.env.MS_LOGS,
    cryptoKey: process.env.CRYPTO_KEY,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
};
