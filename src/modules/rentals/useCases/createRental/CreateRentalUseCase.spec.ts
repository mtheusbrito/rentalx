import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/App.error";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepository: CarsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1231",
      brand: "brand",
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1234",
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Car test 1",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1231",
      brand: "brand",
    });
    const car2 = await carsRepository.create({
      name: "Test",
      description: "Car test 2",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1231",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1234",
      expected_return_date: dayAdd24hours,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car2.id,
        user_id: "1234",
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("There`s a rental in progress for user!"));
  });
  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1231",
      brand: "brand",
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "teste",
      expected_return_date: dayAdd24hours,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "teste",
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental whit invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "teste",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
