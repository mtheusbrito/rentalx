import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
    });
    this.specifications.push(specification);
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((s) => s.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((s) => ids.includes(s.id));
  }
}

export { SpecificationRepositoryInMemory };
