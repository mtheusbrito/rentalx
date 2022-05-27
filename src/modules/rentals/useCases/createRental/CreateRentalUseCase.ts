import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/App.error";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
// @injectable()
class CreateRentalUseCase {
  constructor(
    // @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    // O aluguel deve ter duraçao mínima de 24 horas.
    // Não deve ser possivel cadastrar um novo aluguel caso
    // já exista um aberto para o mesmo carro e mesmo usuário
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There`s a rental in progress for user!");
    }
  }
}
export { CreateRentalUseCase };
