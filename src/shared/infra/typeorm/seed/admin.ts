import { hash } from "bcrypt";
import { v4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();
  const id = v4();

  const password = await hash("admin", 8);
  connection.query(`INSERT INTO users(id, name, email, driver_license, password, isAdmin, created_at, deleted_at)
                              values('${id}', 'admin', 'admin@rentx.com', 'ABCABC' , '${password}', true , NOW(), NULL )`);

  await connection.close();
}

create().then(() => console.log("User admin created"));
