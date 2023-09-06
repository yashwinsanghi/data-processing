class DataFrame {
  private data: Record<string, any>[] = [];

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
    const dataTypes: Record<string, string> = {};
    const firstRow = this.data[0] || {};
    for (const key in firstRow) {
      if (firstRow.hasOwnProperty(key)) {
        dataTypes[key] = typeof firstRow[key];
      }
    }
    return dataTypes;
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

  // Implement other methods for filtering, sorting, grouping, and aggregation as required.
}

export { DataFrame };
