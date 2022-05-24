import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();
const carsController = new CreateCarController();

carsRoutes.post("/", carsController.handle);

export { carsRoutes };
