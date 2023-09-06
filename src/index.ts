import { DataFrame } from "./DataFrame";
export { DataFrame } from "./DataFrame";

const myDataFrame = new DataFrame([
  { name: "Alice", age: 30, phone: 123 },
  { name: "Bob", age: 25, phone: 234 },
  { name: "Charlie", age: 35, phone: 6345 },
]);

// Display the complete DataFrame
console.log("\nDisplay the complete DataFrame\n");
myDataFrame.displayAll();

// Display the first 2 rows of the DataFrame
console.log("\nDisplay the first 2 rows of the DataFrame\n");
myDataFrame.display(2);

// Display the last 2 rows of the DataFrame
console.log("\nDisplay the last 2 rows of the DataFrame\n");
myDataFrame.displayLast(2);

// Display the shape of the DataFrame
console.log("\nDisplay the shape of the DataFrame\n");
console.log(myDataFrame.shape());

// Display the data types of each column
console.log("\nDisplay the data types of each column\n");
console.log(myDataFrame.dataTypes());

// Rename the 'name' column to 'firstName'
console.log("\nRename the 'name' column to 'firstName'\n");
myDataFrame.renameColumns({ name: "firstName" });

// Drop the 'age' column
console.log("\nDrop the age column\n");
myDataFrame.dropColumn("age");
myDataFrame.display();

// Select the 'firstName' column
console.log("\nSelect the firstName column\n");
myDataFrame.selectColumns(["firstName"]).display();
