import csvParse from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createWriteStream(file.path);
    const parseFile = csvParse();
    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line); // ['SUV', 'qwertyui....'],
    });
  }
}
export { ImportCategoryUseCase };
