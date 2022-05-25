import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({});
    // console.log(cars);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by Name ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({
      name: "Name car",
    });
    // console.log(cars);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({
      brand: "brand_test",
    });
    // console.log(cars);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc123",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category",
    });
    // console.log(cars);
    expect(cars).toEqual([car]);
  });
});
