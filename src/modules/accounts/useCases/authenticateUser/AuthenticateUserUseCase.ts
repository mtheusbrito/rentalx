import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/App.error";

// import { User } from "../../entities/User";

type IRequest = {
  email: string;
  password: string;
};
type IResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
};
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse | Error> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "fef9fb595df67d02241d377e75888a98", {
      subject: user.id,
      expiresIn: "1d",
    });
    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
