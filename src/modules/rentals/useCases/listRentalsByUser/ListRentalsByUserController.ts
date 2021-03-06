import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalsByUseUseCase = container.resolve(ListRentalsByUserUseCase);

    const { id: user_id } = request.user;

    const rentals = await listRentalsByUseUseCase.execute({ user_id });
    return response.status(200).json(rentals);
  }
}

export { ListRentalsByUserController };
