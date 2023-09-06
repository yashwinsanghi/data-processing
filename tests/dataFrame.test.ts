// AI generated
import { DataFrame } from "../src/DataFrame";

describe("DataFrame", () => {
  let testData: Record<string, any>[];

  beforeEach(() => {
    // Sample test data
    testData = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Eve", age: 35 },
    ];
  });

  it("should display all rows", () => {
    const df = new DataFrame(testData);
    const consoleSpy = jest
      .spyOn(console, "table")
      .mockImplementation(() => {});

    df.displayAll();

    expect(consoleSpy).toHaveBeenCalledWith(testData);
  });

  it("should display the first n rows", () => {
    const df = new DataFrame(testData);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    df.display(2);

    expect(consoleSpy).toHaveBeenCalledWith([testData[0], testData[1]]);
  });

  it("should display the last n rows", () => {
    const df = new DataFrame(testData);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    df.displayLast(2);

    expect(consoleSpy).toHaveBeenCalledWith([testData[1], testData[2]]);
  });

  it("should return the shape of the DataFrame", () => {
    const df = new DataFrame(testData);

    const shape = df.shape();

    expect(shape).toEqual({ rows: 3, columns: 2 });
  });

  it("should return data types of columns", () => {
    const df = new DataFrame(testData);

    const dataTypes = df.dataTypes();

    expect(dataTypes).toEqual({ name: "string", age: "number" });
  });

  it("should rename columns", () => {
    const df = new DataFrame(testData);

    df.renameColumns({ name: "firstName", age: "years" });

    expect(df.getData()).toEqual([
      { firstName: "Alice", years: 30 },
      { firstName: "Bob", years: 25 },
      { firstName: "Eve", years: 35 },
    ]);
  });

  it("should drop a column", () => {
    const df = new DataFrame(testData);

    df.dropColumn("age");

    expect(df.getData()).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Eve" },
    ]);
  });

  it("should select specific columns", () => {
    const df = new DataFrame(testData);

    const selected = df.selectColumns(["name"]);

    expect(selected.getData()).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Eve" },
    ]);
  });

  // Add more test cases for other methods as needed.
});
