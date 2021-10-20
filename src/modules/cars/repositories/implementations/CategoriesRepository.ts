import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  // private categories: Category[];
  private repository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  // singleton
  private constructor() {
    this.repository = getRepository(Category);
  }
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category: Category = this.repository.create({
      description,
      name,
    });
  }
  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((cat) => cat.name === name);
    return category;
  }
}
export { CategoriesRepository };
