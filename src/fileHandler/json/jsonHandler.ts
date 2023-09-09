import fs from "fs";
import iconv from "iconv-lite";
import detectCharacterEncoding from "detect-character-encoding";

export class JsonHandler {
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
