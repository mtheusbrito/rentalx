import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/App.error";

dayjs.extend(utc);
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
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;
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
    const expectReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectReturnDateFormat).diff(dateNow, "hours");
    if (compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}
export { CreateRentalUseCase };
