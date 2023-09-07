import { StatisticOperations } from "./statistics/operations";
import {
  areAllElementsSame,
  fetchDataTypeForGivenData,
  findKeysByValue,
} from "./util";

export class DataFrame {
  private data: Record<string, any>[] = [];
  private statisticsOperationService: StatisticOperations =
    new StatisticOperations();
  constructor(data: Record<string, any>[] = []) {
    this.data = data;
  }

  // Return the data as an array of objects.
  getData(): Record<string, any>[] {
    return this.data;
  }

  // Display all the rows of the DataFrame.
  displayAll(): void {
    console.table(this.data);
  }

  // Display the first n rows of the DataFrame (default n=5).
  displayFirst(n: number = 5): void {
    console.log(this.data.slice(0, n));
  }

  // Display the first and last n rows of the DataFrame (default n=5).
  display(n: number = 5): void {
    console.log(this.data.slice(0, n));
    console.log(this.data.slice(-n));
  }

  // Display the last n rows of the DataFrame (default n=5).
  displayLast(n: number = 5): void {
    console.log(this.data.slice(-n));
  }

  // Display the shape of the DataFrame (number of rows and columns).
  shape(): { rows: number; columns: number } {
    return {
      rows: this.data.length,
      columns: Object.keys(this.data[0] || {}).length,
    };
  }

  // Display the data types of each column.
  dataTypes(): Record<string, string> {
    return fetchDataTypeForGivenData(this.data[0] || {});
  }

  // Rename columns.
  renameColumns(mapping: Record<string, string>): void {
    this.data = this.data.map((row) => {
      const newRow: Record<string, any> = {};
      for (const key in row) {
        if (row.hasOwnProperty(key) && mapping[key]) {
          newRow[mapping[key]] = row[key];
        } else {
          newRow[key] = row[key];
        }
      }
      return newRow;
    });
  }

  // Drop a column from the DataFrame.
  dropColumn(columnName: string): void {
    this.data = this.data.map((row) => {
      const newRow: Record<string, any> = { ...row };
      delete newRow[columnName];
      return newRow;
    });
  }

  // Select a specific column or columns from the DataFrame.
  selectColumns(columns: string | string[]): DataFrame {
    if (typeof columns === "string") {
      return new DataFrame(
        this.data.map((row) => ({ [columns]: row[columns] }))
      );
    } else {
      return new DataFrame(
        this.data.map((row) => {
          const newRow: Record<string, any> = {};
          columns.forEach((col) => {
            newRow[col] = row[col];
          });
          return newRow;
        })
      );
    }
  }

  // Filter the DataFrame by a condition.
  filter(condition: (row: Record<string, any>) => boolean): DataFrame {
    return new DataFrame(this.data.filter(condition));
  }

  // Sort the DataFrame by one or multiple columns, in ascending or descending order or a custom comparator function.
  sort(
    columns: string | string[],
    ascending: boolean = true,
    comparator?: (a: any, b: any) => number
  ): void {
    if (typeof columns === "string") {
      columns = [columns];
    }

    if (comparator) {
      // Sort using the provided comparator function.
      this.data.sort((a, b) => {
        for (const col of columns) {
          const result = comparator(a[col], b[col]);
          if (result !== 0) {
            return ascending ? result : -result;
          }
        }
        return 0;
      });
    } else {
      // Sort based on the column values.
      this.data.sort((a, b) => {
        for (const col of columns) {
          const aValue = a[col];
          const bValue = b[col];
          if (aValue < bValue) {
            return ascending ? -1 : 1;
          } else if (aValue > bValue) {
            return ascending ? 1 : -1;
          }
        }
        return 0;
      });
    }
  }

  // Group the DataFrame by a column.
  groupBy(columnNames: string | string[]): Record<string, any> {
    const groups: Record<string, any> = {};
    const columns = Array.isArray(columnNames)
      ? [...columnNames]
      : [columnNames];
    this.data.forEach((row) => {
      const groupKey = columns.map((col) => row[col]).join("-");
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(row);
    });
    return groups;
  }

  // Aggregate the DataFrame by a column.
  aggregate(
    columnNames: string | string[],
    aggregationFunction: (values: any[]) => any
  ): Record<string, any> {
    let columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    const groups = this.groupBy(columns);
    const aggregated: Record<string, any> = {};
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) {
        const groupKey = key.split("-");
        const aggregationKey = groupKey.join("/");
        aggregated[aggregationKey] = aggregationFunction(groups[key]);
      }
    }
    return aggregated;
  }

  // Calculate the sum.
  sum(columnNames?: string | string[]): Record<string, number> {
    const sums: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return sums;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        sums[column] = this.statisticsOperationService.sum(
          this.data.map((row) => row[column])
        );
      }
    });
    return sums;
  }

  // Return the count.
  count(columnNames?: string | string[]): Record<string, number> {
    const counts: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    if (!columns.length) {
      return counts;
    }
    columns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        counts[column] = this.statisticsOperationService.count(
          this.data.map((row) => row[column])
        );
      }
    });
    return counts;
  }

  // Calculate the min.
  min(columnNames?: string | string[]): Record<string, number> {
    const minResult: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return minResult;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        minResult[column] = this.statisticsOperationService.min(
          this.data.map((row) => row[column])
        );
      }
    });
    return minResult;
  }

  // Calculate the max.
  max(columnNames?: string | string[]): Record<string, number> {
    const maxResult: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return maxResult;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        maxResult[column] = this.statisticsOperationService.max(
          this.data.map((row) => row[column])
        );
      }
    });
    return maxResult;
  }

  // Calculate the mean (average).
  // Partially Generated By AI
  mean(columnNames?: string | string[]): Record<string, number> {
    const means: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return means;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        means[column] = this.statisticsOperationService.mean(
          this.data.map((row) => row[column])
        );
      }
    });
    return means;
  }

  // Calculate the median.
  // Partially Generated By AI
  median(columnNames?: string | string[]): Record<string, number> {
    const medians: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return medians;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        medians[column] = this.statisticsOperationService.median(
          this.data.map((row) => row[column])
        );
      }
    });
    return medians;
  }

  // Calculate the mode.
  // Partially Generated By AI
  mode(columnNames?: string | string[]): Record<string, any> {
    const modes: Record<string, any> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    if (!columns.length) {
      return modes;
    }
    columns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        let currentMode = this.statisticsOperationService.mode(
          this.data.map((row) => row[column])
        );
        if (!currentMode || !Object.keys(currentMode).length) {
          modes[column] = {};
          return;
        }
        // No mode found
        if (areAllElementsSame(Object.values(currentMode))) {
          modes[column] = Object.keys(currentMode);
          return;
        }
        let maximumFrequency = Math.max(...Object.values(currentMode));
        modes[column] = findKeysByValue(currentMode, maximumFrequency);
      }
    });
    return modes;
  }

  // Calculate the variance.
  // Partially Generated By AI
  variance(columnNames?: string | string[]): Record<string, number> {
    const variances: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return variances;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        variances[column] = this.statisticsOperationService.variance(
          this.data.map((row) => row[column])
        );
      }
    });
    return variances;
  }

  // Calculate the standard deviation.
  // Partially Generated By AI
  standardDeviation(columnNames?: string | string[]): Record<string, number> {
    const standardDeviations: Record<string, number> = {};
    let columns: string[] = [];
    if (!columnNames) {
      columns = Object.keys(this.data[0]);
    }
    if (columnNames) {
      columns = Array.isArray(columnNames) ? columnNames : [columnNames];
    }
    let eligibleColumns =
      this.statisticsOperationService.onlyNumberColumnFilter(
        fetchDataTypeForGivenData(this.data[0] || {}),
        columns
      );
    if (!eligibleColumns.length) {
      return standardDeviations;
    }
    eligibleColumns.forEach((column) => {
      if (this.data[0].hasOwnProperty(column)) {
        standardDeviations[column] =
          this.statisticsOperationService.standardDeviation(
            this.data.map((row) => row[column])
          );
      }
    });
    return standardDeviations;
  }
}
