module.exports = {
  type: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  migrations: ["./src/shared/infra/typeorm/migrations/*{.ts,.js}"],
  entities: ["./src/modules/**/**/infra/typeorm/entities/*{.ts,.js}"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
};
