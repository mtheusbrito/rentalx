import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;
  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  available: boolean;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export { Car };
