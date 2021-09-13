import { Specification } from "../models/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    throw new Error("Method not implemented.");
  }
}
