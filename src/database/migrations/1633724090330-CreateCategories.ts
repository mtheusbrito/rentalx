import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1633724090330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          // { name: "id", type: "uuid", isPrimary: true },     //postgres
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
