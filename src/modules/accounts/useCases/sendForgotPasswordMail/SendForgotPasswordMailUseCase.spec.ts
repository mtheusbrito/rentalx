import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/App.error";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepository = new UsersTokensRepositoryInMemory();

    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "123123",
      email: "test@gmail.com",
      name: "Test",
      password: "12345",
    });
    await sendForgotPasswordMailUseCase.execute("test@gmail.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("tesssst@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      driver_license: "123123",
      email: "test@gmail.com",
      name: "Test",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("test@gmail.com");

    expect(generateTokenMail).toBeCalled();
  });
});
