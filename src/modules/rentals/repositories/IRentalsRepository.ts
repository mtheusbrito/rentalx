import { ICreateRentalDTO } from "@modules/rentals/infra/typeorm/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;

  findById(id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
}
export { IRentalsRepository };
