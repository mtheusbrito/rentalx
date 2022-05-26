import { Request, Response } from "express";
import { container } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const { id } = request.params;
    const { specifications_id } = request.body;
    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(car).status(200);
  }
}
export { CreateCarSpecificationController };
