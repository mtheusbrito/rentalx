import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });
    return specification;
  }
  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    // Object.assign(specification, { name, description, created_at: new Date() });

    // this.specifications.push(specification);
  }
}

export { SpecificationsRepository };
