import { CsvHandler } from "./csv/csvHandler";
import { JsonHandler } from "./json/jsonHandler";

/**
 * @class FileHandler
 * @description
 * The `FileHandler` class provides methods to read and write CSV and JSON files.
 * @remarks
 * This class is a wrapper around the {@link CsvHandler} and {@link JsonHandler} classes.
 */
export class FileHandler {
  private csvHandler: CsvHandler = new CsvHandler();
  private jsonHandler: JsonHandler = new JsonHandler();
  constructor() {}

  /**
   * The function `readCsv` reads a CSV file and returns its contents as an array of objects.
   * @param {string} filePath - A string representing the path to the CSV file that needs to be read.
   * @param {number} [acceptableFileSizeInBytes] - The `acceptableFileSizeInBytes` parameter is an
   * optional parameter that specifies the maximum size of the CSV file that can be read. If this
   * parameter is provided, the function will check if the size of the file specified by `filePath` is
   * within the acceptable range before reading it. If the file size exceeds it, the function will throw an error.
   * @returns a Promise that resolves to an array of objects, where each object represents a record
   * from the CSV file.
   */
  readCsv(
    filePath: string,
    acceptableFileSizeInBytes?: number
  ): Promise<Record<string, any>[]> {
    return this.csvHandler.readCsv(filePath, acceptableFileSizeInBytes);
  }

  /**
   * The function reads a JSON file and returns its contents as an array of objects.
   * @param {string} filePath - A string representing the path to the JSON file that you want to read.
   * @param {number} [acceptableFileSizeInBytes] - The `acceptableFileSizeInBytes` parameter is an
   * optional parameter that specifies the maximum size of the JSON file that can be read. If this
   * parameter is provided, the function will check if the size of the JSON file is within the
   * acceptable limit before reading it. If the file size exceeds the acceptable limit, the function will throw an error.
   * @returns a Promise that resolves to an array of objects, where each object represents a record in
   * the JSON file.
   */
  readJson(
    filePath: string,
    acceptableFileSizeInBytes?: number
  ): Promise<Record<string, any>[]> {
    return this.jsonHandler.readJson(filePath, acceptableFileSizeInBytes);
  }

  writeCsv(jsonData: Record<string, any>[], filePath: string): Promise<void> {
    return this.csvHandler.writeCsv(jsonData, filePath);
  }

  writeJson(jsonData: Record<string, any>[], filePath: string): Promise<void> {
    return this.jsonHandler.writeJson(jsonData, filePath);
  }
}
