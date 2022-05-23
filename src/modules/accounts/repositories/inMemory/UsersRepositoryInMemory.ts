import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(data: ICreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { UsersRepositoryInMemory };
