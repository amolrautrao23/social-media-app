import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    port: process.env.DB_PORT,

    timezone: "+05:30",   // ONLY this is needed

    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },

    logging: false,
  }
);

export default sequelize;
