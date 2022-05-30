import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/App.error";

type IPayload = {
  sub: string;
};
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();
  const { secret_refresh_token } = auth;
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  // Bearer tokenCode
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, secret_refresh_token) as IPayload;

    // const usersRepository = new UsersRepository();
    // const user = await this.usersRepository.findById()
    // if (!user) {
    //   throw new AppError("Users does exists!", 401);
    // }

    const userToken = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );
    if (!userToken) {
      throw new AppError("Invalid token!", 401);
    }

    if (!userToken.user) {
      throw new AppError("Users does exists!", 401);
    }

    request.user = {
      id: userToken.user.id,
    };
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }

  return next();
}
