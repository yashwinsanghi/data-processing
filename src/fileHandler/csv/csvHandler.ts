import fs from "fs";
import iconv from "iconv-lite";
import csvParser, { Options } from "csv-parser";
import detectCharacterEncoding from "detect-character-encoding";
import stripBomStream from "strip-bom-stream";

export class CsvHandler {
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
}
