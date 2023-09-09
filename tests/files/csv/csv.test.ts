import { FileHandler } from "../../../src/fileHandler/fileHandler";
import { TEST_DATA, FILE_SIZE_LIMIT_ERROR } from "../constants";
const path = require("path");

describe("CSV File Handler", () => {
  let fileHandlerClass: FileHandler;
  let currentDirectory = __dirname;
  beforeAll(() => {
    fileHandlerClass = new FileHandler();
  });

  it("should read the input CSV file which is UTF-8 encoded", async () => {
    expect.assertions(1);
    try {
      const data = await fileHandlerClass.readCsv(
        path.join(currentDirectory, "utf8.csv")
      );
      expect(data).toEqual(TEST_DATA);
    } catch (er) {
      expect(er).toBeUndefined();
    }
  });

  it("should read the input CSV and throw an error for exceeding file size", async () => {
    expect.assertions(1);
    try {
      const fileSizeLimit = 200;
      const data = await fileHandlerClass.readCsv(
        path.join(currentDirectory, "utf8.csv"),
        fileSizeLimit
      );
      expect(data).toBeUndefined();
    } catch (er: any) {
      let errorMessage = er.message;
      expect(errorMessage).toEqual(FILE_SIZE_LIMIT_ERROR);
    }
  });

  it("should read a UTF-16 encoded CSV file", async () => {
    expect.assertions(1);
    try {
      const data = await fileHandlerClass.readCsv(
        path.join(currentDirectory, "utf16.csv")
      );
      expect(data).toEqual(TEST_DATA);
    } catch (er: any) {
      expect(er).toBeUndefined();
    }
  });

  it("should read a UTF-32 encoded CSV file", async () => {
    expect.assertions(1);
    try {
      const data = await fileHandlerClass.readCsv(
        path.join(currentDirectory, "utf32.csv")
      );
      expect(data).toEqual(TEST_DATA);
    } catch (er: any) {
      expect(er).toBeUndefined();
    }
  });

  it("should read a UTF-8 BOM encoded CSV file", async () => {
    expect.assertions(1);
    try {
      const data = await fileHandlerClass.readCsv(
        path.join(currentDirectory, "bom.csv")
      );
      expect(data).toEqual(TEST_DATA);
    } catch (er: any) {
      expect(er).toBeUndefined();
    }
  });
});
