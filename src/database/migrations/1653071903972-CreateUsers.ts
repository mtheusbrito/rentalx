import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1653071903972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true,
          },
          { name: "password", type: "varchar" },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "driver_license",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
