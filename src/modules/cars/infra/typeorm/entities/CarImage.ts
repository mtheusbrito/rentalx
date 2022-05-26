import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.created_at = new Date();
    }
  }
}

export { CarImage };
