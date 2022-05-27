import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/App.error";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: new Date(),
    });
    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: new Date(),
      });

      const rental = await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: new Date(),
      });
      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "teste",
        expected_return_date: new Date(),
      });

      const rental = await createRentalUseCase.execute({
        car_id: "321",
        user_id: "teste",
        expected_return_date: new Date(),
      });
      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
