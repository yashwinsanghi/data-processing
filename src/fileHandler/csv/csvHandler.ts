import fs from "fs";
import iconv from "iconv-lite";
import csvParser, { Options } from "csv-parser";
import detectCharacterEncoding from "detect-character-encoding";
import stripBomStream from "strip-bom-stream";

/**
 * @class CsvHandler
 * @description
 * The `CsvHandler` class provides methods for reading and writing CSV files.
 */
export class CsvHandler {
  /**
   * The function `readCsv` reads a CSV file, detects its encoding, checks its size, and processes it
   * based on the provided configuration.
   * @param {string} filePath - The `filePath` parameter is a string that represents the path to the
   * CSV file that you want to read.
   * @param {number} [acceptableFileSize] - The `acceptableFileSize` parameter is an optional number
   * that represents the maximum allowed size of the CSV file in bytes. If the size of the file exceeds
   * this limit, the function will throw a file limit exceeded error.
   * @param {Options} [config] - The `config` parameter is an optional object that contains additional
   * options for processing the CSV file. It can include properties such as delimiter, quote character,
   * escape character, and headers. These options allow you to customize how the CSV file is parsed and
   * converted into a JavaScript object.
   * @returns a Promise that resolves to an array of objects. Each object represents a record from the
   * CSV file.
   */
  readCsv(
    filePath: string,
    acceptableFileSize?: number,
    config?: Options
  ): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      const encodingInfo = detectCharacterEncoding(fs.readFileSync(filePath));
      const encoding =
        encodingInfo && encodingInfo.encoding ? encodingInfo.encoding : "";

      if (!encoding || encoding === null || encoding.length === 0) {
        reject(new Error("Unable to detect file encoding."));
        return;
      }

      if (acceptableFileSize) {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            reject(err);
            return;
          }

          if (stats.size > acceptableFileSize!) {
            reject(new Error("File exceeds maximum allowed size."));
            return;
          }

          this.processCsv(
            filePath,
            encoding.toUpperCase(),
            config && Object.keys(config) && Object.keys(config).length > 0
              ? config
              : {},
            resolve,
            reject
          );
        });
      } else {
        this.processCsv(
          filePath,
          encoding.toUpperCase(),
          config && Object.keys(config) && Object.keys(config).length > 0
            ? config
            : {},
          resolve,
          reject
        );
      }
    });
  }

  /**
   * The function `processCsv` parses the CSV file's contents, and returns the data as an array
   * of objects.
   * @param {string} filePath - The `filePath` parameter is a string that represents the path to the
   * CSV file that needs to be processed.
   * @param {string} encoding - The `encoding` parameter specifies the character encoding of the CSV
   * file. It determines how the bytes in the file are interpreted as characters. Common encoding
   * values include "utf8", "utf16le", "latin1", etc.
   * @param {Options} options - The `options` parameter is an object that contains additional options
   * for parsing the CSV file. It can include properties such as `delimiter` (specifying the delimiter
   * used in the CSV file), `quote` (specifying the quote character used in the CSV file), `escape`
   * (specifying the
   * @param resolve - The `resolve` parameter is a callback function that is called when the CSV
   * parsing process is successfully completed. It takes an array of `Record<string, any>` as its
   * argument, which represents the parsed data from the CSV file.
   * @param reject - The `reject` parameter is a function that is called when an error occurs during
   * the CSV processing. It takes an `error` parameter, which is an instance of the `Error` class, and
   * handles the error in some way, such as logging it or throwing an exception.
   */
  private processCsv(
    filePath: string,
    encoding: string,
    options: Options,
    resolve: (data: Record<string, any>[]) => void,
    reject: (error: Error) => void
  ): void {
    let data: Record<string, any>[] = [];
    let parserOptions: Options = {
      mapValues: ({ header, index, value }) => {
        if (!isNaN(value) && value !== "") {
          return parseFloat(value);
        }
        if (value.toLowerCase() === "true") {
          return true;
        }
        if (value.toLowerCase() === "false") {
          return false;
        }
        return value;
      },
    };
    if (options && Object.keys(options) && Object.keys(options).length > 0) {
      parserOptions = { ...parserOptions, ...options };
    }
    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream(encoding))
      .pipe(stripBomStream())
      .pipe(csvParser(parserOptions))
      .on("data", (row: Record<string, any>) => {
        data.push(row);
      })
      .on("end", () => resolve(data))
      .on("error", (err: Error) => reject(err));
  }

  /**
   * The function `writeCsv` takes an array of JSON data and a file path as input, and writes the data
   * to a CSV file using `,` as delimiter and `\n` as line break in `UTF-8 encoding`.
   * @param {Record<string, any>[]} jsonData - An array of objects where each object represents a row
   * of data in JSON format.
   * @param {string} filePath - The `filePath` parameter is a string that represents the path where the
   * CSV file will be saved. It should include the file name and extension (e.g., "data.csv").
   * @returns a Promise that resolves to void when the CSV is generated and saved successfully on the given `filePath`
   * and rejects when an error occurs during the process.
   */
  writeCsv(jsonData: Record<string, any>[], filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const header = Object.keys(jsonData[0]);
      const csvData = jsonData.map((row) => {
        return header
          .map((fieldName) => {
            return JSON.stringify(row[fieldName] || "");
          })
          .join(",");
      });
      csvData.unshift(header.join(","));
      fs.writeFile(filePath, csvData.join("\n"), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
