import { DataFrame } from "../../src/dataFrame"; // Adjust the import path as needed

describe("DataFrame Statistical Methods", () => {
  let testData: Record<string, any>[];

  beforeEach(() => {
    // Sample test data with different scenarios
    testData = [
      { name: "Alice", age: 30, score: 85, class: "A" },
      { name: "Bob", age: 25, score: 92, class: "B" },
      { name: "Charlie", age: 35, score: 78, class: "A" },
      { name: "David", age: 28, score: 90, class: "B" },
      { name: "Eva", age: 30, score: 88, class: "C" },
    ];
  });

  // Test cases for Checking sum
  it("should calculate the sum of positive numerical values", () => {
    const df = new DataFrame(testData);

    const sumResult = df.sum(["age", "score"]);

    expect(sumResult).toEqual({ age: 148, score: 433 });
  });

  it("should calculate the sum of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const sumResult = df.sum(["age", "score"]);

    expect(sumResult).toEqual({ age: -148, score: -433 });
  });

  it("should calculate the sum of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const sumResult = df.sum(["age", "score"]);

    expect(sumResult).toEqual({ age: 0, score: 0 });
  });

  it("should calculate the sum of string values (should be ignored)", () => {
    const df = new DataFrame(testData);

    const sumResult = df.sum("name");

    expect(sumResult).toEqual({});
  });

  // Test cases for Checking count
  it("should calculate the count of positive numerical values", () => {
    const df = new DataFrame(testData);

    const countResult = df.count(["age", "score"]);

    expect(countResult).toEqual({ age: 5, score: 5 });
  });

  it("should calculate the count of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const countResult = df.count(["age", "score"]);

    expect(countResult).toEqual({ age: 5, score: 5 });
  });

  it("should calculate the count of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const countResult = df.count(["age", "score"]);

    expect(countResult).toEqual({ age: 5, score: 5 });
  });

  it("should calculate the count of string values (should be ignored)", () => {
    const df = new DataFrame(testData);

    const countResult = df.count("name");

    expect(countResult).toEqual({ name: 5 });
  });

  // Test cases for Checking min
  it("should calculate the min of positive numerical values", () => {
    const df = new DataFrame(testData);

    const minResult = df.min(["age", "score"]);

    expect(minResult).toEqual({ age: 25, score: 78 });
  });

  it("should calculate the min of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const minResult = df.min(["age", "score"]);

    expect(minResult).toEqual({ age: -35, score: -92 });
  });

  it("should calculate the min of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const minResult = df.min(["age", "score"]);

    expect(minResult).toEqual({ age: 0, score: 0 });
  });

  it("should calculate the min of string values (should be ignored)", () => {
    const df = new DataFrame(testData);

    const minResult = df.min(["name"]);

    expect(minResult).toEqual({});
  });

  // Test cases for Checking max
  it("should calculate the max of positive numerical values", () => {
    const df = new DataFrame(testData);

    const maxResult = df.max(["age", "score"]);

    expect(maxResult).toEqual({ age: 35, score: 92 });
  });

  it("should calculate the max of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const maxResult = df.max(["age", "score"]);

    expect(maxResult).toEqual({ age: -25, score: -78 });
  });

  it("should calculate the max of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const maxResult = df.max(["age", "score"]);

    expect(maxResult).toEqual({ age: 0, score: 0 });
  });

  it("should calculate the max of string values (should be ignored)", () => {
    const df = new DataFrame(testData);

    const maxResult = df.max(["name"]);

    expect(maxResult).toEqual({});
  });

  // Test cases for Checking mean
  it("should calculate the mean of positive numerical values", () => {
    const df = new DataFrame(testData);

    const meanResult = df.mean(["age", "score"]);

    expect(meanResult).toEqual({ age: 29.6, score: 86.6 });
  });

  it("should calculate the mean of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const meanResult = df.mean(["age", "score"]);

    expect(meanResult).toEqual({ age: -29.6, score: -86.6 });
  });

  it("should calculate the mean of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const meanResult = df.mean(["age", "score"]);

    expect(meanResult).toEqual({ age: 0, score: 0 });
  });

  it("should ignore non-numeric string values when calculating the mean", () => {
    const df = new DataFrame(testData);

    const meanResult = df.mean("name");

    expect(meanResult).toEqual({});
  });

  // Test cases for Checking median
  it("should calculate the median of positive numerical values", () => {
    const df = new DataFrame(testData);

    const medianResult = df.median(["age", "score"]);

    expect(medianResult).toEqual({ age: 30, score: 88 });
  });

  it("should calculate the median of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const medianResult = df.median(["age", "score"]);

    expect(medianResult).toEqual({ age: -30, score: -88 });
  });

  it("should calculate the median of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const medianResult = df.median(["age", "score"]);

    expect(medianResult).toEqual({ age: 0, score: 0 });
  });

  it("should calculate the median of string values (should be ignored)", () => {
    const df = new DataFrame(testData);

    const medianResult = df.median("name");

    expect(medianResult).toEqual({});
  });

  // Test cases for Checking mode
  it("should calculate the mode of numerical values with a single mode", () => {
    const df = new DataFrame(testData);

    const modeResult = df.mode("age");

    expect(modeResult).toEqual({ age: ["30"] });
  });

  it("should calculate the mode of numerical values with multiple modes", () => {
    const multiModeData = [
      { name: "Alice", age: 30, score: 85 },
      { name: "Bob", age: 25, score: 92 },
      { name: "Charlie", age: 35, score: 78 },
      { name: "David", age: 30, score: 85 }, // Age and score both have multiple modes
      { name: "Eva", age: 35, score: 92 }, // Age and score both have multiple modes
    ];
    const df = new DataFrame(multiModeData);

    const modeResult = df.mode(["age", "score"]);

    expect(modeResult).toEqual({ age: ["30", "35"], score: ["85", "92"] });
  });

  it("should calculate the mode of numerical values with no mode (unique values)", () => {
    const uniqueData = [
      { name: "Alice", age: 30, score: 85 },
      { name: "Bob", age: 25, score: 92 },
      { name: "Charlie", age: 35, score: 78 },
      { name: "David", age: 28, score: 90 },
      { name: "Eva", age: 40, score: 88 }, // No mode for age or score
    ];
    const df = new DataFrame(uniqueData);

    const modeResult = df.mode(["age", "score"]);

    expect(modeResult).toEqual({
      age: ["25", "28", "30", "35", "40"],
      score: ["78", "85", "88", "90", "92"],
    }); // No mode
  });

  it("should ignore non-numeric values when calculating the mode", () => {
    const df = new DataFrame(testData);

    const modeResult = df.mode(["class"]);

    expect(modeResult).toEqual({ class: ["A", "B"] });
  });

  // Test cases for Checking variance
  it("should calculate the variance of positive numerical values", () => {
    const df = new DataFrame(testData);

    const varianceResult = df.variance(["age", "score"]);

    expect(varianceResult).toEqual({ age: 13.3, score: 29.8 });
  });

  it("should calculate the variance of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const varianceResult = df.variance(["age", "score"]);

    expect(varianceResult).toEqual({ age: 13.3, score: 29.8 });
  });

  it("should calculate the variance of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const varianceResult = df.variance(["age", "score"]);

    expect(varianceResult).toEqual({ age: 0, score: 0 });
  });

  it("should ignore non-numeric string values when calculating the variance", () => {
    const df = new DataFrame(testData);

    const varianceResult = df.variance("name");

    expect(varianceResult).toEqual({});
  });

  // Test cases for Checking standard deviation
  it("should calculate the standard deviation of positive numerical values", () => {
    const df = new DataFrame(testData);

    const stdResult = df.standardDeviation(["age", "score"]);

    expect(stdResult).toEqual({
      age: 3.646916505762094,
      score: 5.458937625582473,
    });
  });

  it("should calculate the standard deviation of negative numerical values", () => {
    const negativeData = [
      { name: "Alice", age: -30, score: -85 },
      { name: "Bob", age: -25, score: -92 },
      { name: "Charlie", age: -35, score: -78 },
      { name: "David", age: -28, score: -90 },
      { name: "Eva", age: -30, score: -88 },
    ];
    const df = new DataFrame(negativeData);

    const stdResult = df.standardDeviation(["age", "score"]);

    expect(stdResult).toEqual({
      age: 3.646916505762094,
      score: 5.458937625582473,
    });
  });

  it("should calculate the standard deviation of all zero values", () => {
    const zeroData = [
      { name: "Alice", age: 0, score: 0 },
      { name: "Bob", age: 0, score: 0 },
      { name: "Charlie", age: 0, score: 0 },
      { name: "David", age: 0, score: 0 },
      { name: "Eva", age: 0, score: 0 },
    ];
    const df = new DataFrame(zeroData);

    const stdResult = df.standardDeviation(["age", "score"]);

    expect(stdResult).toEqual({ age: 0, score: 0 });
  });

  it("should ignore non-numeric string values when calculating the standard deviation", () => {
    const df = new DataFrame(testData);

    const stdResult = df.standardDeviation("name");

    expect(stdResult).toEqual({});
  });
  // Similar test cases for other statistical methods
});
