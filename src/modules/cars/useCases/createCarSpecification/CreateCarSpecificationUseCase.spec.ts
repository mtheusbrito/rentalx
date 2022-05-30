import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/App.error";

import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let specificationInMemory: SpecificationRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;
describe("Create car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationInMemory
    );

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationInMemory
    );
  });
  it("should not be able to add a new specification to now-existent car", async () => {
    const car_id = "123";
    const specifications_id = ["54321"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationInMemory.create({
      description: "Test",
      name: "Test",
    });
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
