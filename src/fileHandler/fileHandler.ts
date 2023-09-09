import { CsvHandler } from "./csv/csvHandler";
import { JsonHandler } from "./json/jsonHandler";
export class FileHandler {
  private csvHandler: CsvHandler = new CsvHandler();
  private jsonHandler: JsonHandler = new JsonHandler();
  constructor() {}

  readCsv(
    filePath: string,
    acceptableFileSizeInBytes?: number
  ): Promise<Record<string, any>[]> {
    return this.csvHandler.readCsv(filePath, acceptableFileSizeInBytes);
  }

  readJson(
    filePath: string,
    acceptableFileSizeInBytes?: number
  ): Promise<Record<string, any>[]> {
    return this.jsonHandler.readJson(filePath, acceptableFileSizeInBytes);
  }
}
