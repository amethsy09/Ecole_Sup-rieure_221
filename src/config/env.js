
require('dotenv').config();

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  USE_CLASS_MOCKS: process.env.USE_CLASS_MOCKS || "false",

  URI: process.env.URI || `http://localhost:${process.env.PORT || 5000}`,
};

module.exports = env;



