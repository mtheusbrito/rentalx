import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/CreateUserController";

const userRouters = Router();
const createUserController = new CreateUserController();
userRouters.post("/", createUserController.handle);

export { userRouters };
