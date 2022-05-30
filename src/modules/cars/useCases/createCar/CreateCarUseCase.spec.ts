import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/App.error";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create a new car with exists license plate ", async () => {
    await createCarUseCase.execute({
      name: "Name car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
    await expect(
      createCarUseCase.execute({
        name: "Name car 2",
        description: "Description car",
        daily_rate: 100,
        license_plate: "abc123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a new car with available true by default ", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
