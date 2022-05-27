import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByCar(car_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(user_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}
export { RentalsRepository };
