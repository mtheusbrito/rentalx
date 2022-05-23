import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/App.error";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

type IPayload = {
  sub: string;
};
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  // Bearer tokenCode
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "fef9fb595df67d02241d377e75888a98"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Users does exists!", 401);
    }

    request.user = {
      id: user.id,
    };
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }

  return next();
}
