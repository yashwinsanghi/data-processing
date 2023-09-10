# Data Processing Library in Node.js and TypeScript

The goal of this assignment is to create a high-level data processing library similar to
Pandas in Python, using Node.js and TypeScript. The library should provide basic
functionality for handling and manipulating structured data, such as reading and writing
data from various sources, filtering, sorting, and performing basic statistical operations.

## Getting Started

We can get started by importing `DataFrame` class.

```javascript
import { DataFrame } from "data-processor";
```

For File I/O, we will have to import `FileHanlder Class`

```javascript
import { FileHandler } from "data-processor";
```

In case, you `fork` the current repository to play around,
I recommend using `node` `v14.22.x` (lts/fermuim) version, yet the code is compatible to work on `node` >= v14.

`index.ts` file has sample data and sample playaround code which can be utilised.

To run the code, run `npm run dev` in your terminal.

To run the test cases, run `npm test` in your terminal.

## Usage

### Creating the DataFrame

Start by defining your first `DataFrame`

```javascript
import { DataFrame } from "data-processor";

const myDataFrame = new DataFrame([
  { name: "Alice", class: "A", gender: "Female", score: 95, age: 25 },
  { name: "Bob", class: "B", gender: "Male", score: 88, age: 22 },
  { name: "Charlie", class: "A", gender: "Male", score: 92, age: 35 },
  { name: "David", class: "B", gender: "Male", score: 78, age: 26 },
  { name: "Eva", class: "A", gender: "Female", score: 97, age: 30 },
]);
```

### Reading From a File

You can also create you `DataFrame` from a `CSV` file.

```javascript
import { FileHandler } from "data-processor";
import { DataFrame } from "data-processor";

const testCsv = async () => {
  try {
    let csvData = await new FileHandler().readCsv("/path/to/file.csv");
    const df = new DataFrame(csvData);
    console.log(df.getData());
  } catch (err) {
    console.log(err);
  }
};
testCsv();
```

Or a `JSON` file.

```javascript
import { FileHandler } from "data-processor";
import { DataFrame } from "data-processor";

const testJson = async () => {
  try {
    let jsonData = await new FileHandler().readJson("/path/to/file.json");
    const df = new DataFrame(jsonData);
    console.log(df.getData());
  } catch (err) {
    console.log(err);
  }
};
testJson();
```

### Displaying the DataFrame

Display the complete `DataFrame` as a table

```javascript
myDataFrame.displayAll();
// output
// ┌─────────┬───────────┬───────┬──────────┬───────┬─────┐
// │ (index) │   name    │ class │  gender  │ score │ age │
// ├─────────┼───────────┼───────┼──────────┼───────┼─────┤
// │    0    │  'Alice'  │  'A'  │ 'Female' │  95   │ 25  │
// │    1    │   'Bob'   │  'B'  │  'Male'  │  88   │ 22  │
// │    2    │ 'Charlie' │  'A'  │  'Male'  │  92   │ 35  │
// │    3    │  'David'  │  'B'  │  'Male'  │  78   │ 26  │
// │    4    │   'Eva'   │  'A'  │ 'Female' │  97   │ 30  │
// └─────────┴───────────┴───────┴──────────┴───────┴─────┘
```

Display the first n (default n = 5) rows of the `DataFrame`.

```javascript
let n = 2;
myDataFrame.displayFirst(n);
// output
// [
//  { name: 'Alice', class: 'A', gender: 'Female', score: 95, age: 25 },
//  { name: 'Bob', class: 'B', gender: 'Male', score: 88, age: 22 }
// ]
```

Display the first & last n (default n = 5) rows of the `DataFrame`.

```javascript
let n = 2;
myDataFrame.display(n);
// output
// [
//   { name: 'Alice', class: 'A', gender: 'Female', score: 95, age: 25 },
//   { name: 'Bob', class: 'B', gender: 'Male', score: 88, age: 22 }
// ]
// [
//   { name: 'David', class: 'B', gender: 'Male', score: 78, age: 26 },
//   { name: 'Eva', class: 'A', gender: 'Female', score: 97, age: 30 }
// ]
```

Display the last n rows of the `DataFrame`

```javascript
let n = 2;
myDataFrame.displayLast(n);
// output
// [
//   { name: 'David', class: 'B', gender: 'Male', score: 78, age: 26 },
//   { name: 'Eva', class: 'A', gender: 'Female', score: 97, age: 30 }
// ]
```

### Basic Operations

Determine the number of rows and columns in the `DataFrame`.

```javascript
console.log(myDataFrame.shape());
// output
// { rows: 5, columns: 5 }
```

Determine the data type of each column in the `DataFrame`

```javascript
console.log(myDataFrame.dataTypes());
// output
// {
//   name: 'string',
//   class: 'string',
//   gender: 'string',
//   score: 'number',
//   age: 'number'
// }
```

Rename a column

```javascript
myDataFrame.renameColumns({ name: "firstName" });
console.log(myDataFrame.dataTypes());
// output
// {
//   firstName: 'string',
//   class: 'string',
//   gender: 'string',
//   score: 'number',
//   age: 'number'
// }
```

Drop a column

```javascript
myDataFrame.dropColumn("age");
console.log(myDataFrame.dataTypes());
// output
// {
//   firstName: 'string',
//   class: 'string',
//   gender: 'string',
//   score: 'number',
// }
```

Select column/columns from the `DataFrame`

```javascript
const smallDf = myDataFrame.selectColumns(["firstName"]);
console.log(smallDf.dataTypes());
// output
// {
//   firstName: 'string'
// }
```

### Data Manipulation Operations

Perform a filter on `DataFrame`

```javascript
const filteredDataFrame = myDataFrame.filter(
  (row) => row.firstName === "Alice"
);
filteredDataFrame.displayFirst(2);
// output
// [ { firstName: 'Alice', class: 'A', gender: 'Female', score: 95 } ]
```

Sort the `DataFrame`

```javascript
myDataFrame.sort("age", false);
myDataFrame.displayFirst();
// output
// [
//   { firstName: 'Alice', class: 'A', gender: 'Female', score: 95 },
//   { firstName: 'Bob', class: 'B', gender: 'Male', score: 88 },
//   { firstName: 'Charlie', class: 'A', gender: 'Male', score: 92 },
//   { firstName: 'David', class: 'B', gender: 'Male', score: 78 },
//   { firstName: 'Eva', class: 'A', gender: 'Female', score: 97 }
// ]
```

Group the `DataFrame`.

```javascript
console.log(myDataFrame.groupBy(["class", "gender"]));
// output
//{
//  'A-Female': [
//    { firstName: 'Alice', class: 'A', gender: 'Female', score: 95 },
//    { firstName: 'Eva', class: 'A', gender: 'Female', score: 97 }
//  ],
//  'B-Male': [
//    { firstName: 'Bob', class: 'B', gender: 'Male', score: 88 },
//    { firstName: 'David', class: 'B', gender: 'Male', score: 78 }
//  ],
//  'A-Male': [ { firstName: 'Charlie', class: 'A', gender: 'Male', score: 92 } ]
//}
```

Perform an aggregation on the `DataFrame`

```javascript
function calculateAverage(values: Record<string, any>[]): number {
  let sum = 0;
  values.forEach((acc) => {
    sum = sum + acc.score;
  });
  return sum === 0 ? 0 : sum / values.length;
}
console.log(myDataFrame.aggregate(["class", "gender"], calculateAverage));
// output
// { 'A/Female': 96, 'B/Male': 83, 'A/Male': 92 }
```

### Statistical Operations

All ths statistical operations except `mode` & `count` shall be performed on columns which have numeric data. Every function has a common behaviour with respect to the `columnName` argument. It accepts a string or an array of strings. If neither of it are provided, the function will run over the complete `DataFrame`.

Find the `count` of data for a given column in the `DataFrame`

```javascript
console.log(myDataFrame.count("age"));
// output
// {}
console.log(myDataFrame.count("score"));
// output
// { score: 5 }
console.log(myDataFrame.count());
//output
// { firstName: 5, class: 5, gender: 5, score: 5 }
```

Find the minimum value of each column in the `DataFrame`

```javascript
console.log(myDataFrame.min());
console.log(myDataFrame.min("score"));
// output :: Both the above statements will produce the same output
// { score: 78 }
```

Find the maximum value of each column in the `DataFrame`

```javascript
console.log(myDataFrame.max());
console.log(myDataFrame.max("score"));
// output :: Both the above statements will produce the same output
// { score: 97 }
```

Find the `sum`

```javascript
console.log(myDataFrame.sum("score"));
// output
// { score: 450 }
```

Find the `mean`

```javascript
console.log(myDataFrame.mean("score"));
// output
// { score: 90 }
```

Find the `median`

```javascript
console.log(myDataFrame.mediam("score"));
// output
// { score: 92 }
```

Find the `median`

```javascript
console.log(myDataFrame.mediam("score"));
// output
// { score: 92 }
```

Find the `mod`

```javascript
console.log(myDataFrame.mode("score"));
// output
// { score: [ '78', '88', '92', '95', '97' ] }

console.log(myDataFrame.mode("class"));
// output
// { class: [ 'A' ] }

console.log(myDataFrame.mode());
// output
// {
//   firstName: [ 'Alice', 'Bob', 'Charlie', 'David', 'Eva' ],
//   class: [ 'A' ],
//   gender: [ 'Male' ],
//   score: [ '78', '88', '92', '95', '97' ]
// }
```

Find the `variance`

```javascript
console.log(myDataFrame.variance("score"));
// output
// { score: 56.5 }
```

Find the `standard Deviation`

```javascript
console.log(myDataFrame.standardDeviation("score"));
// output
// { score: 7.516648189186454 }
```

### Writing to a File

The code is capable of exporting the `DataFrame` as `CSV` or `JSON` file.

#### CSV Export

The file is saved in `UTF-8` encoding and utilises `,` as delimiter and `\n` for line break, irrespective of the underyling node environment.

```javascript
const path = require("path");
myDataFrame.myDataFrame.toCsv(path.join(__dirname, "utf8.csv"));
// output
// A file names ut8.csv is generated
```

#### JSON Export

The file is saved in `UTF-8` encoding.

```javascript
const path = require("path");
myDataFrame.myDataFrame.toJson(path.join(__dirname, "utf8.json"));
// output
// A file names ut8.json is generated
```
