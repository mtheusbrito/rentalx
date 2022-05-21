import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "fef9fb595df67d02241d377e75888a98", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}