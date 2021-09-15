import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(file.path);
      const catergories: IImportCategory[] = [];

      const parseFile = csvParse();
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          // console.log(line); // ['SUV', 'qwertyui....'],
          const [name, description] = line;
          catergories.push({ name, description });
        })
        .on("end", () => {
          resolve(catergories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
export { ImportCategoryUseCase };
