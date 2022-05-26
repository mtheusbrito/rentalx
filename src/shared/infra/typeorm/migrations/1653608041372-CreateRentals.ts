import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1653608041372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          { name: "car_id", type: "varchar" },
          { name: "user_id", type: "varchar" },
          { name: "start_date", type: "timestamp", default: "now()" },
          { name: "end_date", type: "timestamp", isNullable: true },
          { name: "expect_return_date", type: "timestamp", isNullable: true },
          { name: "total", type: "numeric" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "FKCarRental",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
          },
          {
            name: "FKUserRental",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}
