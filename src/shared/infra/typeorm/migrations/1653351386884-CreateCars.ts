import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1653351386884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar" },
          { name: "daily_rate", type: "numeric" },
          { name: "available", type: "boolean", default: true },
          { name: "license_plate", type: "varchar" },
          {
            name: "fine_amount",
            type: "numeric",
          },
          { name: "brand", type: "varchar" },
          { name: "category_id", type: "varchar", isNullable: true },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "categoryCar",
            columnNames: ["category_id"],
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            // onDelete: "SET NULL",
            // onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}
