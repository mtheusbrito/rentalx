import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";

let connection: Connection;
describe("List category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.dropDatabase();
    await connection.runMigrations();

    const id = v4();

    const password = await hash("admin", 8);
    await connection.query(`INSERT INTO users(id, name, email, driver_license, password, isAdmin, created_at, deleted_at)
                              values('${id}', 'admin', 'admin@rentx.com', 'ABCABC' , '${password}', true , NOW(), NULL )`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to list all available categories", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@rentx.com",
      password: "admin",
    });
    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
  });
});
