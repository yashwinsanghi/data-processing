// AI Generated File
import { DataFrame } from "../src/dataFrame"; // Make sure to import your DataFrame class.

describe("DataFrame", () => {
  let testData: Record<string, any>[];

  beforeEach(() => {
    // Sample test data
    testData = [
      { name: "Alice", class: "A", gender: "Female", score: 95, age: 25 },
      { name: "Bob", class: "B", gender: "Male", score: 88, age: 22 },
      { name: "Charlie", class: "A", gender: "Male", score: 92, age: 35 },
      { name: "David", class: "B", gender: "Male", score: 78, age: 26 },
      { name: "Eva", class: "A", gender: "Female", score: 97, age: 30 },
    ];
  });

  it("should create a DataFrame instance", () => {
    const df = new DataFrame(testData);
    expect(df).toBeInstanceOf(DataFrame);
  });

  it("should return the data as an array of objects", () => {
    const df = new DataFrame(testData);
    const data = df.getData();
    expect(data).toEqual(testData);
  });

  it("should display all rows in the console", () => {
    const df = new DataFrame(testData);
    const consoleSpy = jest
      .spyOn(console, "table")
      .mockImplementation(() => {});
    df.displayAll();
    expect(consoleSpy).toHaveBeenCalledWith(testData);
  });

  it("should display the first n rows in the console", () => {
    const df = new DataFrame(testData);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    df.displayFirst(2);
    expect(consoleSpy).toHaveBeenCalledWith([testData[0], testData[1]]);
  });

  it("should display the last n rows in the console", () => {
    const df = new DataFrame(testData);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    df.displayLast(2);
    expect(consoleSpy).toHaveBeenCalledWith([testData[3], testData[4]]);
  });

  it("should return the shape of the DataFrame", () => {
    const df = new DataFrame(testData);
    const shape = df.shape();
    expect(shape).toEqual({ rows: 5, columns: 5 });
  });

  it("should return data types of columns", () => {
    const df = new DataFrame(testData);
    const dataTypes = df.dataTypes();
    expect(dataTypes).toEqual({
      name: "string",
      class: "string",
      gender: "string",
      score: "number",
      age: "number",
    });
  });

  it("should rename columns", () => {
    const df = new DataFrame(testData);
    df.renameColumns({ name: "firstName", age: "years" });
    const renamedData = df.getData();
    const expectedData = [
      {
        firstName: "Alice",
        class: "A",
        gender: "Female",
        score: 95,
        years: 25,
      },
      { firstName: "Bob", class: "B", gender: "Male", score: 88, years: 22 },
      {
        firstName: "Charlie",
        class: "A",
        gender: "Male",
        score: 92,
        years: 35,
      },
      { firstName: "David", class: "B", gender: "Male", score: 78, years: 26 },
      { firstName: "Eva", class: "A", gender: "Female", score: 97, years: 30 },
    ];
    expect(renamedData).toEqual(expectedData);
  });

  it("should drop a column", () => {
    const df = new DataFrame(testData);
    df.dropColumn("age");
    const newData = df.getData();
    const expectedData = [
      { name: "Alice", class: "A", gender: "Female", score: 95 },
      { name: "Bob", class: "B", gender: "Male", score: 88 },
      { name: "Charlie", class: "A", gender: "Male", score: 92 },
      { name: "David", class: "B", gender: "Male", score: 78 },
      { name: "Eva", class: "A", gender: "Female", score: 97 },
    ];
    expect(newData).toEqual(expectedData);
  });

  it("should select specific columns", () => {
    const df = new DataFrame(testData);
    const selected = df.selectColumns(["name", "score"]);
    const selectedData = selected.getData();
    const expectedData = [
      { name: "Alice", score: 95 },
      { name: "Bob", score: 88 },
      { name: "Charlie", score: 92 },
      { name: "David", score: 78 },
      { name: "Eva", score: 97 },
    ];
    expect(selectedData).toEqual(expectedData);
  });

  it("should filter rows based on a condition", () => {
    const df = new DataFrame(testData);
    const filtered = df.filter((row) => row.age > 30);
    const filteredData = filtered.getData();
    const expectedData = [
      { name: "Charlie", class: "A", gender: "Male", score: 92, age: 35 },
    ];
    console.log(filteredData);
    expect(filteredData).toEqual(expectedData);
  });

  it("should sort rows in ascending order by age", () => {
    const df = new DataFrame(testData);
    df.sort("age");
    const sortedData = df.getData();
    const expectedData = [
      { name: "Bob", class: "B", gender: "Male", score: 88, age: 22 },
      { name: "Alice", class: "A", gender: "Female", score: 95, age: 25 },
      { name: "David", class: "B", gender: "Male", score: 78, age: 26 },
      { name: "Eva", class: "A", gender: "Female", score: 97, age: 30 },
      { name: "Charlie", class: "A", gender: "Male", score: 92, age: 35 },
    ];
    expect(sortedData).toEqual(expectedData);
  });

  it("should sort rows in descending order by age", () => {
    const df = new DataFrame(testData);
    df.sort("age", false);
    const sortedData = df.getData();
    const expectedData = [
      { name: "Charlie", class: "A", gender: "Male", score: 92, age: 35 },
      { name: "Eva", class: "A", gender: "Female", score: 97, age: 30 },
      { name: "David", class: "B", gender: "Male", score: 78, age: 26 },
      { name: "Alice", class: "A", gender: "Female", score: 95, age: 25 },
      { name: "Bob", class: "B", gender: "Male", score: 88, age: 22 },
    ];
    expect(sortedData).toEqual(expectedData);
  });

  it("should group rows by class and gender and aggregate by average score", () => {
    const df = new DataFrame(testData);
    const aggregated = df.aggregate(
      ["class", "gender"],
      (values: Record<string, any>[]) => {
        const sum = values.reduce((acc, row) => acc + row.score, 0);
        return sum / values.length;
      }
    );
    const expectedAggregated = {
      "A/Female": 96,
      "B/Male": 83,
      "A/Male": 92,
    };
    expect(aggregated).toEqual(expectedAggregated);
  });
});
