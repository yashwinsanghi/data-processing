import { DataFrame, MergeMode } from "../../../src/dataFrame";

describe("DataFrame Join (Right)", () => {
  it("should return all records from the right DataFrame if there are no matching records in the left DataFrame", () => {
    const sourceDataFrame = new DataFrame([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ]);
    const targetDataFrame = new DataFrame([
      { id: 3, age: 30 },
      { id: 4, age: 25 },
    ]);

    const resultDataFrame = sourceDataFrame.join(
      targetDataFrame,
      "id",
      "id",
      MergeMode.RIGHT
    );

    // Check that the result contains all records from the right DataFrame
    expect(resultDataFrame.getData()).toEqual([
      { id: 3, age: 30 },
      { id: 4, age: 25 },
    ]);
  });

  it("should perform a right join with multiple entries in source and one matching entry in target", () => {
    // Define source and target data
    const sourceData = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "Bob Smith" },
      { id: 4, name: "Alice Johnson" },
      { id: 5, name: "Eve Johnson" },
    ];

    const targetData = [{ id: 2, age: 30, email: "jane@example.com" }];

    // Create DataFrame instances
    const sourceDataFrame = new DataFrame(sourceData);
    const targetDataFrame = new DataFrame(targetData);

    // Perform right join
    const mergedDataFrame = sourceDataFrame.join(
      targetDataFrame,
      "id",
      "id",
      MergeMode.RIGHT
    );

    // Define the expected result
    const expectedResult = [
      { id: 2, name: "Jane Doe", age: 30, email: "jane@example.com" },
    ];

    // Compare the result with the expected outcome
    expect(mergedDataFrame.getData()).toEqual(expectedResult);
  });

  it("should perform a right join with one entry in source and multiple matching entries in target", () => {
    // Create source and target DataFrames
    const sourceDataFrame = new DataFrame([{ id: 1, name: "John Doe" }]);

    const targetDataFrame = new DataFrame([
      { id: 1, age: 30, email: "john@example.com" },
      { id: 1, age: 25, email: "john.doe@example.com" },
      { id: 1, age: 28, email: "johndoe@example.com" },
      { id: 1, age: 32, email: "johnd@example.com" },
      { id: 1, age: 35, email: "j.doe@example.com" },
    ]);

    // Perform right join
    const mergedDataFrame = sourceDataFrame.join(
      targetDataFrame,
      "id",
      "id",
      MergeMode.RIGHT
    );

    // Check the merged DataFrame
    const expectedMergedData = [
      { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
      { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com" },
      { id: 1, name: "John Doe", age: 28, email: "johndoe@example.com" },
      { id: 1, name: "John Doe", age: 32, email: "johnd@example.com" },
      { id: 1, name: "John Doe", age: 35, email: "j.doe@example.com" },
    ];

    expect(mergedDataFrame.getData()).toEqual(expectedMergedData);
  });

  it("should merge DataFrames (Right Join) multiple matching entries in both source and target", () => {
    const sourceDataFrame = new DataFrame([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Jim" },
      { id: 4, name: "Jack" },
      { id: 5, name: "Jill" },
    ]);
    const targetDataFrame = new DataFrame([
      { id: 1, age: 30 },
      { id: 3, age: 25 },
      { id: 5, age: 28 },
      { id: 6, age: 35 },
      { id: 7, age: 40 },
    ]);
    const mergedDataFrame = sourceDataFrame.join(
      targetDataFrame,
      "id",
      "id",
      MergeMode.RIGHT
    );

    // Perform assertions to verify the merged data
    const expectedResult = [
      { id: 1, name: "John", age: 30 },
      { id: 3, name: "Jim", age: 25 },
      { id: 5, name: "Jill", age: 28 },
      { id: 6, age: 35 },
      { id: 7, age: 40 },
    ];
    expect(mergedDataFrame.getData()).toEqual(expectedResult);
  });
});
