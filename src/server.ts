import bodyParser from "body-parser";
import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/categories", categoriesRoutes);

app.listen(3333, () => console.log("Server is running!"));
