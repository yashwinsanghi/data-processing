import { DataFrame } from "./dataFrame";
export { DataFrame } from "./dataFrame";

const myDataFrame = new DataFrame([
  { name: "Alice", class: "A", gender: "Female", score: 95, age: 25 },
  { name: "Bob", class: "B", gender: "Male", score: 88, age: 22 },
  { name: "Charlie", class: "A", gender: "Male", score: 92, age: 35 },
  { name: "David", class: "B", gender: "Male", score: 78, age: 26 },
  { name: "Eva", class: "A", gender: "Female", score: 97, age: 30 },
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
myDataFrame.display(2);

// Select the 'firstName' column
console.log("\nSelect the firstName column\n");
myDataFrame.selectColumns(["firstName"]).display(2);

// Filter the DataFrame to only include rows where the 'firstName' is 'Alice'
console.log(
  "\nFilter the DataFrame to only include rows where the firstName is Alice\n"
);
myDataFrame.filter((row) => row.firstName === "Alice");
myDataFrame.display(2);

// Sort by the 'age' column in ascending order
console.log("\nSort by the age column in ascending order\n");
myDataFrame.sort("age", false);
myDataFrame.display(2);

// Sort by the 'name' column in descending order
console.log("\nSort by the name column in descending order\n");
myDataFrame.sort("firstName", true);
myDataFrame.display(2);

// Sort by name and phone in descending order
console.log("\nSort by name and phone in descending order\n");
myDataFrame.sort(["firstName", "phone"]);
myDataFrame.display(2);

// Group the data by class and gender
console.log("\nGroup the data by class and gender\n");
console.log(myDataFrame.groupBy(["class", "gender"]));

// Aggregate the average score of the dataframe based on class and gender
function calculateAverage(values: Record<string, any>[]): number {
  let sum = 0;
  values.forEach((acc) => {
    sum = sum + acc.score;
  });
  return sum === 0 ? 0 : sum / values.length;
}
console.log(myDataFrame.aggregate(["class", "gender"], calculateAverage));
