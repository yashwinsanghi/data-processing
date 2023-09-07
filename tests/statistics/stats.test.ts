// AI Generated File
import { StatisticOperations } from "../../src/statistics/operations"; // Import your StatisticOperations class here

describe("StatisticOperations", () => {
  let statOps: StatisticOperations;

  beforeEach(() => {
    statOps = new StatisticOperations();
  });

  it("should return empty array for onlyNumberColumnFilter with empty data type or columns", () => {
    const emptyResult1 = statOps.onlyNumberColumnFilter({}, []);
    expect(emptyResult1).toEqual([]);

    const emptyResult2 = statOps.onlyNumberColumnFilter({ age: "string" }, []);
    expect(emptyResult2).toEqual([]);

    const emptyResult3 = statOps.onlyNumberColumnFilter({}, ["age"]);
    expect(emptyResult3).toEqual([]);
  });

  it("should filter only numeric columns with onlyNumberColumnFilter", () => {
    const dataType = { name: "string", age: "number", score: "number" };
    const columns = ["name", "age", "score"];

    const numericColumns = statOps.onlyNumberColumnFilter(dataType, columns);
    expect(numericColumns).toEqual(["age", "score"]);
  });

  it("should calculate count correctly", () => {
    const data1 = ["Alice", "Bob", "Charlie"];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.count(data1)).toEqual(3);
    expect(statOps.count(data2)).toEqual(5);
    expect(statOps.count(data3)).toEqual(3);
    expect(statOps.count(data4)).toEqual(3);
  });

  it("should calculate sum correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.sum(data1)).toEqual(60);
    expect(statOps.sum(data2)).toEqual(15);
    expect(statOps.sum(data3)).toEqual(-6);
    expect(statOps.sum(data4)).toEqual(0);
  });

  it("should calculate min correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.min(data1)).toEqual(10);
    expect(statOps.min(data2)).toEqual(1);
    expect(statOps.min(data3)).toEqual(-3);
    expect(statOps.min(data4)).toEqual(0);
  });

  it("should calculate max correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.max(data1)).toEqual(30);
    expect(statOps.max(data2)).toEqual(5);
    expect(statOps.max(data3)).toEqual(-1);
    expect(statOps.max(data4)).toEqual(0);
  });

  it("should calculate mean correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.mean(data1)).toEqual(20);
    expect(statOps.mean(data2)).toEqual(3);
    expect(statOps.mean(data3)).toEqual(-2);
    expect(statOps.mean(data4)).toEqual(0);
  });

  it("should calculate median correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];
    const data5 = [1, 2, 3, 4];

    expect(statOps.median(data1)).toEqual(20);
    expect(statOps.median(data2)).toEqual(3);
    expect(statOps.median(data3)).toEqual(-2);
    expect(statOps.median(data4)).toEqual(0);
    expect(statOps.median(data5)).toEqual(2.5);
  });

  it("should calculate mode correctly", () => {
    const data1 = ["Alice", "Bob", "Alice", "Charlie", "Bob"];
    const data2 = [1, 2, 2, 3, 3, 3, 4, 4];
    const data3 = [-1, -1, -2, -3, -3, -3];
    const data4 = ["A", "B", "C", "A"];

    expect(statOps.mode(data1)).toEqual({ Alice: 2, Bob: 2, Charlie: 1 });
    expect(statOps.mode(data2)).toEqual({ 1: 1, 2: 2, 3: 3, 4: 2 });
    expect(statOps.mode(data3)).toEqual({ "-1": 2, "-2": 1, "-3": 3 });
    expect(statOps.mode(data4)).toEqual({ A: 2, B: 1, C: 1 });
  });

  it("should calculate variance correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.variance(data1)).toEqual(100);
    expect(statOps.variance(data2)).toEqual(2.5);
    expect(statOps.variance(data3)).toEqual(1);
    expect(statOps.variance(data4)).toEqual(0);
  });

  it("should calculate standard deviation correctly", () => {
    const data1 = [10, 20, 30];
    const data2 = [1, 2, 3, 4, 5];
    const data3 = [-1, -2, -3];
    const data4 = [0, 0, 0];

    expect(statOps.standardDeviation(data1)).toEqual(10);
    expect(statOps.standardDeviation(data2)).toEqual(1.5811388300841898);
    expect(statOps.standardDeviation(data3)).toEqual(1);
    expect(statOps.standardDeviation(data4)).toEqual(0);
  });
});
