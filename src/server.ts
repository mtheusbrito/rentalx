import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import swagger from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

import "./shared/container";

const app = express();
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
