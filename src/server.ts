import "reflect-metadata";
// import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import { AppError } from "@errors/App.error";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
