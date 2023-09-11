// inner.test.ts

import { DataFrame, MergeMode } from "../../src/dataFrame"; // Import the necessary classes and enums

describe("DataFrame Join Null & Empty Checks", () => {
  let sourceDataFrame: DataFrame;
  let targetDataFrame: DataFrame;
  const sourceColumn = "id";
  const targetColumn = "id";

  beforeEach(() => {
    // Sample Data
    const sourceData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Jim" },
      { id: 4, name: "Jack" },
      { id: 5, name: "Jill" },
    ];

    const targetData = [
      { id: 1, age: 30 },
      { id: 3, age: 25 },
      { id: 5, age: 28 },
      { id: 6, age: 35 },
      { id: 7, age: 40 },
    ];

    sourceDataFrame = new DataFrame(sourceData);
    targetDataFrame = new DataFrame(targetData);
  });

  it("should throw an error if Source DataFrame is empty", () => {
    // Use try-catch block to handle expected error
    try {
      new DataFrame([]).join(
        targetDataFrame,
        sourceColumn,
        targetColumn,
        MergeMode.INNER
      );
    } catch (error: any) {
      expect(error.message).toBe(
        "Source DataFrame is either not provided or is empty."
      );
    }
  });

  it("should throw an error if Target DataFrame is empty", () => {
    // Use try-catch block to handle expected error
    try {
      sourceDataFrame.join(
        new DataFrame([]),
        sourceColumn,
        targetColumn,
        MergeMode.INNER
      );
    } catch (error: any) {
      expect(error.message).toBe(
        "Target DataFrame is either not provided or is empty."
      );
    }
  });

  it("should throw an error if Source Column is not provided", () => {
    // Use try-catch block to handle expected error
    try {
      sourceDataFrame.join(targetDataFrame, "", targetColumn, MergeMode.INNER);
    } catch (error: any) {
      expect(error.message).toBe("Source column must be specified.");
    }
  });

  it("should throw an error if Target Column is not provided", () => {
    // Use try-catch block to handle expected error
    try {
      sourceDataFrame.join(targetDataFrame, sourceColumn, "", MergeMode.INNER);
    } catch (error: any) {
      expect(error.message).toBe("Target column must be specified.");
    }
  });

  it("should throw an error if mergeMode is empty", () => {
    try {
      sourceDataFrame.join(
        targetDataFrame,
        sourceColumn,
        targetColumn,
        "" as any
      );
    } catch (error: any) {
      expect(error.message).toBe("Merge mode must be specified.");
    }
  });

  it("should throw an error if mergeMode is not valid", () => {
    try {
      sourceDataFrame.join(
        targetDataFrame,
        sourceColumn,
        targetColumn,
        "invalidmode" as any
      );
    } catch (error: any) {
      expect(error.message).toBe("Invalid merge mode.");
    }
  });

  it("should throw an error if sourceColumnName is not a valid column in Source DataFrame", () => {
    // Use try-catch block to handle expected error
    try {
      sourceDataFrame.join(
        targetDataFrame,
        "invalidColumn",
        targetColumn,
        MergeMode.INNER
      );
    } catch (error: any) {
      expect(error.message).toBe(
        "Source column invalidColumn is not a valid column in source DataFrame."
      );
    }
  });

  it("should throw an error if targetColumnName is not a valid column in Target DataFrame", () => {
    // Use try-catch block to handle expected error
    try {
      sourceDataFrame.join(
        targetDataFrame,
        sourceColumn,
        "invalidColumn",
        MergeMode.INNER
      );
    } catch (error: any) {
      expect(error.message).toBe(
        "Target column invalidColumn is not a valid column in target DataFrame."
      );
    }
  });
});
