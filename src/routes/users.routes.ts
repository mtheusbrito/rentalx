import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const userRouters = Router();
const createUserController = new CreateUserController();
userRouters.post("/", createUserController.handle);

export { userRouters };
