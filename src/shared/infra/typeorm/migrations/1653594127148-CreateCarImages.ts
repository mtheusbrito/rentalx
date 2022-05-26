import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarImages1653594127148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_image",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "car_id",
            type: "varchar",
          },
          { name: "image_name", type: "varchar" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "FKCarImage",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars_image");
  }
}
