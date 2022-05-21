import { User } from "./src/modules/accounts/entities/User";
import { Category } from "./src/modules/cars/entities/Category";

module.exports = {
  type: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  migrations: ["./src/database/migrations/*.ts"],
  entities: [Category, User],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
