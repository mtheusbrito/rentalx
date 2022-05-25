import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/App.error";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const usersRrepository = new UsersRepository();

  const user = await usersRrepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("Users ins't admin!");
  }

  return next();
}
