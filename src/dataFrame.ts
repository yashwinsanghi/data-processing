import { StatisticOperations } from "./statistics/operations";
import { FileHandler } from "./fileHandler/fileHandler";
import {
  areAllElementsSame,
  fetchDataTypeForGivenData,
  findKeysByValue,
} from "./util";
import { AdvancedOperations, MergeModes } from "./advanced/advanced";

/**
 * @class DataFrame
 * @description
 * The "DataFrame" class provides a class based Data Structure.
 * Key Highlights:
 * 1. Store data in the form of Records with string keys and any values.
 * 2. Perform Statistical Operation like mean, mode, median, standard deviation , etc on numberic data
 * 3. Perform Data Manipulation Operations like filter, groupBy, aggregate, etc.
 *
 * @remarks
 * This class uses {@link StatisticOperations} (see {@link StatisticOperations}) for statistical operations
 * and {@link FileHandler} (see {@link FileHandler}) for file handling operations.
 */
export class DataFrame {
  private data: Record<string, any>[] = [];
  /**
   * @type {StatisticOperations}
   * @memberof DataFrame
   * @instance
   */
  private statisticsOperationService: StatisticOperations =
    new StatisticOperations();
  /**
   * @type {FileHandler}
   * @memberof DataFrames
   * @instance
   */
  private fileHandler: FileHandler = new FileHandler();

  /**
   * @type {AdvancedOperations}
   * @memberof DataFrame
   * @instance
   */
  private advancedOperations: AdvancedOperations = new AdvancedOperations();

  constructor(data: Record<string, any>[] = []) {
    this.data = data;
  }

  // Return the data as an array of objects.
  /**
   * The function returns an array of records with string keys and any values.
   * @returns An array of objects, where each object has string keys and any values.
   */
  getData(): Record<string, any>[] {
    return this.data;
  }

  /**
   * The function "displayAll" logs the data in a table format.
   */
  displayAll(): void {
    console.table(this.data);
  }

  // Display the first n rows of the "DataFrame" (default n=5).
  /**
   * The function "displayFirst" logs the first "n" elements of an array called "data" to the console.
   * @param {number} [n=5] - The parameter "n" is a number that specifies the number of elements to
   * display. By default, it is set to 5.
   */
  displayFirst(n: number = 5): void {
    console.log(this.data.slice(0, n));
  }

  // Display the first and last n rows of the "DataFrame" (default n=5).
  /**
   * The `display` function logs the first `n` elements and the last `n` elements of the "DataFrame".
   * @param {number} [n=5] - number - The number of elements to display from the beginning and end of
   * the "DataFrame". The default value is 5.
   */
  display(n: number = 5): void {
    console.log(this.data.slice(0, n));
    console.log(this.data.slice(-n));
  }

  // Display the last n rows of the "DataFrame" (default n=5).
  /**
   * The function "displayLast" logs the last n elements of the "DataFrame" to the console.
   * @param {number} [n=5] - The parameter `n` is a number that specifies the number of elements to
   * display from the end of the "DataFrame" array. By default, it is set to 5 if no value is provided when
   * calling the `displayLast` function.
   */
  displayLast(n: number = 5): void {
    console.log(this.data.slice(-n));
  }

  // Display the shape of the "DataFrame" (number of rows and columns).
  /**
   * The `shape` function returns an object with the number of rows and columns in a given "DataFrame".
   * @returns The shape of the "DataFrame", which is an object with two properties: "rows" and "columns".
   */
  shape(): { rows: number; columns: number } {
    return {
      rows: this.data.length,
      columns: Object.keys(this.data[0] || {}).length,
    };
  }

  // Display the data types of each column.
  /**
   * The function "dataTypes" returns the data types of the properties in the first element of "DataFrame"
   * @returns The function `dataTypes()` is returning a `Record<string, string>`.
   */
  dataTypes(): Record<string, string> {
    return fetchDataTypeForGivenData(this.data[0] || {});
  }

  // Rename columns.
  /**
   * The function `renameColumns` takes a mapping object and renames the columns in the "DataFrame"
   * accordingly.
   * @param mapping - The `mapping` parameter is an object that represents the mapping of old column
   * names to new column names. Each key in the `mapping` object represents an old column name, and its
   * corresponding value represents the new column name.
   */
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

  // Drop a column from the "DataFrame".
  /**
   * The `dropColumn` function removes a specified column from each row in the "DataFrame".
   * @param {string} columnName - The `columnName` parameter is a string that represents the name of
   * the column that you want to remove from the "DataFrame".
   */
  dropColumn(columnName: string): void {
    this.data = this.data.map((row) => {
      const newRow: Record<string, any> = { ...row };
      delete newRow[columnName];
      return newRow;
    });
  }

  // Select a specific column or columns from the "DataFrame".
  /**
   * The function `selectColumns` takes either a single column name or an array of column names and
   * returns a new "DataFrame" object with only the selected columns.
   * @param {string | string[]} columns - The `columns` parameter can be either a string or an array of
   * strings. If it is a string, it represents the name of a single column in the "DataFrame". If it is
   * an array of strings, it represents multiple column names in the "DataFrame".
   * @returns The function `selectColumns` returns a "DataFrame" object.
   */
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

  // Filter the "DataFrame" by a condition.
  /**
   * The filter function takes a condition as input and returns a new "DataFrame" containing only the
   * rows that satisfy the condition.
   * @param condition - The `condition` parameter is a function that takes a row of data as input and
   * returns a boolean value. It is used to filter the rows of the "DataFrame" based on a specific
   * condition. Only the rows for which the condition function returns `true` will be included in the
   * filtered "DataFrame".
   * @returns A new "DataFrame" object is being returned.
   */
  filter(condition: (row: Record<string, any>) => boolean): DataFrame {
    return new DataFrame(this.data.filter(condition));
  }

  // Sort the "DataFrame" by one or multiple columns, in ascending or descending order or a custom comparator function.
  /**
   * The `sort` function sorts an array of objects based on one or more columns, in ascending or
   * descending order, using either a provided comparator function or the default comparison of column
   * values.
   * @param {string | string[]} columns - The `columns` parameter can be either a string or an array of
   * strings. It represents the columns in the "DataFrame" that you want to sort by.
   * @param {boolean} [ascending=true] - A boolean value indicating whether the sorting should be in
   * ascending order (true) or descending order (false). The default value is true, which means the
   * sorting will be in ascending order if the parameter is not provided.
   * @param [comparator] - The `comparator` parameter is an optional function that is used to compare
   * two values in the sorting process. It takes two arguments `a` and `b`, representing the values to
   * be compared, and returns a number indicating their relative order. If `comparator` is not
   * provided, the sorting is done using the default comparison of column values.
   */
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

  // Group the "DataFrame" by a column.
  /**
   * The `groupBy` function takes a column name or an array of column names, and groups the data based
   * on those columns, returning a record object where each key represents a unique group and the
   * corresponding value is an array of rows belonging to that group.
   * @param {string | string[]} columnNames - The `columnNames` parameter can be either a string or an
   * array of strings. It represents the names of the columns in the "DataFrame" that you want to group by.
   * @returns The `groupBy` function returns a `Record<string, any>`, which is an object where the keys
   * are strings and the values can be of any type.
   */
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

  // Aggregate the "DataFrame" by a column.
  /**
   * The `aggregate` function takes column names and an aggregation function as input, groups the data
   * by the specified columns, and applies the aggregation function to each group, returning the
   * aggregated results.
   * @param {string | string[]} columnNames - The `columnNames` parameter can be either a string or an
   * array of strings. It represents the names of the columns in the "DataFrame" that you want to
   * aggregate.
   * @param aggregationFunction - The `aggregationFunction` parameter is a function that takes an array
   * of values and returns a single aggregated value. This function can perform any kind of aggregation
   * operation, such as summing, averaging, finding the maximum or minimum value, etc. The specific
   * aggregation logic depends on the requirements of your application
   * @returns a record object that contains the aggregated values for each group. The keys of the
   * record object are the aggregation keys, which are formed by joining the group keys with "/". The
   * values of the record object are the result of applying the aggregation function to the values of
   * each group.
   */
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
  /**
   * The `sum` function calculates the sum of values in specified columns or all columns in a dataset.
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that can be either a string or an array of strings. It represents the names of the columns for
   * which you want to calculate the sum. If `columnNames` is not provided, the function will calculate
   * the sum for all columns in the data.
   * @returns an object of type `Record<string, number>`, which represents a mapping of column names to
   * their respective sums.
   */
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
  /**
   * The count function takes an optional parameter of column names and returns a record object with
   * the count of each column's values in the "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that can be either a string or an array of strings. It represents the names of the columns in the "DataFrame".
   * If `columnNames` is not provided, the function will calculate the count for all columns in the "DataFrame".
   * @returns an object of type `Record<string, number>`, which represents a mapping of column names to
   * their respective counts.
   */
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
  /**
   * The `min` function calculates the minimum value for each specified column in the data.
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that specifies the names of the columns for which you want to calculate the minimum value. It can
   * be either a string or an array of strings. If `columnNames` is not provided, the function will
   * calculate the minimum value for all columns in the "DataFrame".
   * @returns an object of type `Record<string, number>`, which represents a mapping of column names to
   * their respective minimum values.
   */
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
  /**
   * The max function calculates the maximum value for each specified column in the "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that specifies the names of the columns for which you want to calculate the maximum value. It can
   * be either a string or an array of strings. If `columnNames` is not provided, the function will
   * calculate the maximum value for all columns in the "DataFrame".
   * @returns a record object that contains the maximum value for each column specified in the
   * `columnNames` parameter. The keys of the record object are the column names, and the values are
   * the maximum values for each column.
   */
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
  /**
   * The `mean` function calculates the mean value for each specified column in the "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that can be either a string or an array of strings. It represents the names of the columns for
   * which you want to calculate the mean. If `columnNames` is not provided, the function will
   * calculate the mean for all columns in the "DataFrame".
   * @returns an object of type `Record<string, number>`, which represents a dictionary-like object
   * where the keys are strings and the values are numbers.
   */
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
  /**
   * The `median` function calculates the median value for each specified column in the "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that specifies the names of the columns for which you want to calculate the median. It can be
   * either a string or an array of strings. If `columnNames` is not provided, the function will
   * calculate the median for all columns in the "DataFrame".
   * @returns an object that contains the medians of the specified columns. The object has column names
   * as keys and the corresponding medians as values.
   */
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
  /**
   * The `mode` function calculates the mode (most frequently occurring value) for each column in a
   * "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that specifies the names of the columns for which you want to calculate the mode. It can be either
   * a string or an array of strings. If `columnNames` is not provided, the function will calculate the
   * mode for all columns in the DatFrame.
   * @returns an object that contains the modes (most frequently occurring values) for each column
   * specified in the `columnNames` parameter. The object has column names as keys and the modes as
   * values.
   */
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
  /**
   * The `variance` function calculates the variances of specified or all columns in a "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that can be either a string or an array of strings. It represents the names of the columns for
   * which you want to calculate the variances. If `columnNames` is not provided, the function will
   * calculate the variances for all columns in the "DataFrame".
   * @returns an object that contains the variance for each column specified in the `columnNames` parameter.
   * The object has column names as keys and the variance as values.
   */
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
  /**
   * The function calculates the standard deviation for specified column names or all columns in the
   * "DataFrame".
   * @param {string | string[]} [columnNames] - The `columnNames` parameter is an optional parameter
   * that can be either a string or an array of strings. It represents the names of the columns for
   * which you want to calculate the standard deviation. If `columnNames` is not provided, the function
   * will calculate the standard deviation for all columns in the "DataFrame".
   * @returns an object that contains the standard deviation values for each column specified in the
   * `columnNames` parameter. The keys of the object are the column names, and the values are the
   * corresponding standard deviation values.
   */
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

  /**
   * The function `toCsv` writes the "DataFrame" to a CSV file using the provided file path.
   * @param {string} filePath - A string representing the file path where the CSV file will be written
   * to.
   * @returns A Promise that resolves to void when the CSV file is written successfully.
   */
  toCsv(filePath: string): Promise<void> {
    return this.fileHandler.writeCsv(this.data, filePath);
  }

  /**
   * The function takes a file path and writes the "DataFrame" as JSON to that file.
   * @param {string} filePath - A string representing the file path where the JSON data will be written
   * to.
   * @returns A Promise that resolves to void when the JSON file is written successfully..
   */
  toJson(filePath: string): Promise<void> {
    return this.fileHandler.writeJson(this.data, filePath);
  }
}
