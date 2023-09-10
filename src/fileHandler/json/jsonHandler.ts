import fs from "fs";
import iconv from "iconv-lite";
import detectCharacterEncoding from "detect-character-encoding";

/**
 * @class JsonHandler
 * @description
 * The `JsonHandler` class provides methods to read and write JSON files,
 * including flattening nested JSON structures.
 */
export class JsonHandler {
  /**
   * The function `readJson` reads a JSON file, detects its encoding, checks its size against a maximum
   * limit (if provided), and processes the JSON data.
   * @param {string} filePath - A string representing the path to the JSON file that needs to be read.
   * @param {number} [acceptableFileSize] - The `acceptableFileSize` parameter is an optional parameter
   * that specifies the maximum allowed size for the JSON file. If the file size exceeds this limit,
   * the function will reject the promise with an error message indicating that the file exceeds the
   * maximum allowed size.
   * @returns The function `readJson` returns a Promise that resolves to an array of `Record<string,
   * any>`.
   */
  readJson(
    filePath: string,
    acceptableFileSize?: number
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
          this.processJson(filePath, encoding.toUpperCase(), resolve, reject);
        });
      } else {
        this.processJson(filePath, encoding.toUpperCase(), resolve, reject);
      }
    });
  }

  /**
   * The `processJson` function reads JSON file, decodes it using a specified encoding, and returns
   * the parsed data as an array of flattened objects.
   * @param {string} filePath - The `filePath` parameter is a string that represents the path to the
   * JSON file that needs to be processed.
   * @param {string} encoding - The `encoding` parameter specifies the character encoding of the file
   * being read. It is a string that represents the encoding type, such as "utf8" or "ascii".
   * @param resolve - The `resolve` parameter is a callback function that is called when the JSON data
   * is successfully processed. It takes an argument `data` which is an array of objects
   * (`Record<string, any>[]`).
   * @param reject - The `reject` parameter is a function that is called when an error occurs during
   * the processing of the JSON file. It takes an `error` parameter, which represents the error that
   * occurred.
   */
  private processJson(
    filePath: string,
    encoding: string,
    resolve: (data: Record<string, any>[]) => void,
    reject: (error: any) => void
  ) {
    const fileStream = fs.createReadStream(filePath);

    let pipeline = fileStream.pipe(iconv.decodeStream(encoding));

    let data = "";
    pipeline
      .on("data", (chunk: string) => {
        data += chunk;
      })
      .on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          if (Array.isArray(parsedData)) {
            if (parsedData.length === 0) {
              resolve(parsedData);
            } else {
              let flattenedData: Record<string, any>[] = [];
              parsedData.forEach((data) => {
                let flatData = this.flattenJSON(data);
                flattenedData.push(flatData);
              });
              resolve(flattenedData);
            }
          } else {
            if (Object.keys(parsedData).length === 0) {
              resolve([parsedData]);
            } else {
              resolve([this.flattenJSON(parsedData)]);
            }
          }
        } catch (err: any) {
          reject(err);
        }
      })
      .on("error", (err: Error) => reject(err));
  }

  /**
   * The `flattenJSON` function takes a JSON object and recursively flattens it into a single-level
   * object.
   * @param jsonData - The `jsonData` parameter is an object that represents a JSON data structure. It
   * can contain nested objects and arrays.
   * @param [parentKey] - The `parentKey` parameter is a string that represents the key of the parent
   * object in the JSON data. It is used to create the combined key for nested objects or arrays. If
   * the `parentKey` is empty, it means that the current object is not nested and the key is used as
   * @returns a flattened version of the input JSON data.
   */
  private flattenJSON(
    jsonData: Record<string, any>,
    parentKey = ""
  ): Record<string, any> {
    return Object.keys(jsonData).reduce((acc, key) => {
      const combinedKey = parentKey ? `${parentKey}.${key}` : key;
      const value = jsonData[key];
      if (typeof value === "object" && !Array.isArray(value)) {
        const nestedObject = this.flattenJSON(value, combinedKey);
        return { ...acc, ...nestedObject };
      } else if (Array.isArray(value)) {
        const nestedArray = value.map((item, index) =>
          this.flattenJSON(item, `${combinedKey}[${index}]`)
        );
        return { ...acc, ...Object.assign({}, ...nestedArray) };
      } else {
        return { ...acc, [combinedKey]: value };
      }
    }, {});
  }

  /**
   * The function `writeJson` writes JSON data to a file specified by the `filePath` parameter.
   * @param {Record<string, any>[]} jsonData - jsonData is an array of objects where each object
   * represents a JSON data.
   * @param {string} filePath - The `filePath` parameter is a string that represents the path to the
   * file where the JSON data will be written. It should include the file name and extension. For
   * example, "data.json" or "path/to/data.json".
   * @returns a Promise that resolves to void when the JSON is generated and saved successfully on the given `filePath`
   * and rejects when an error occurs during the process.
   */
  writeJson(jsonData: Record<string, any>[], filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
