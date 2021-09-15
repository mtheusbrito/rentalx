import bodyParser from "body-parser";
import express from "express";

import { router } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
