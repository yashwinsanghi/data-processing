class DataFrame {
  private data: Record<string, any>[] = [];

  constructor(data: Record<string, any>[] = []) {
    this.data = data;
  }

  // Display all the rows of the DataFrame.
  displayAll(): void {
    console.table(this.data);
  }

  // Display the first n rows of the DataFrame (default n=5).
  display(n: number = 5): void {
    console.log(this.data.slice(0, n));
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

  // Implement other methods for filtering, sorting, grouping, and aggregation as required.
}

export { DataFrame };
