require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "sms-management",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "smsmanagementtest",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "sms-management-production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
