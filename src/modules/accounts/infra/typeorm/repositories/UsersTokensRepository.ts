import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokents";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
      withDeleted: false,
      relations: ["user"],
    });
    return userToken;
  }
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });
    await this.repository.save(userToken);
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: { refresh_token },
      withDeleted: false,
    });

    return userToken;
  }
}
export { UsersTokensRepository };
