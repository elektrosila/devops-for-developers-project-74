require('dotenv').config();

const useSsl = process.env.DATABASE_SSL === 'true';

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  production: {
    dialect: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 5432),
    host: process.env.DATABASE_HOST || 'db',
    ...(useSsl ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {}),
  },
  test: {
    dialect: 'sqlite',
    storage: './database.test.sqlite',
  },
};
