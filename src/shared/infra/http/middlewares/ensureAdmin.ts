import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/App.error";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);
  console.log(user);
  if (!user.isAdmin) {
    throw new AppError("Users ins't admin!");
  }

  return next();
}
