import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(): Promise<void>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}
export { IRentalsRepository };
