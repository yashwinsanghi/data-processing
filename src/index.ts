import { DataFrame } from "./dataFrame";
import { FileHandler } from "./fileHandler/fileHandler";
export { DataFrame } from "./dataFrame";

const testJson = async () => {
  try {
    let jsonData = await new FileHandler().readJson("/dist/utf8.json");
    const df = new DataFrame(jsonData);
    console.log(df.getData());
  } catch (err) {
    console.log(err);
  }
};
testJson();

const testCsv = async () => {
  try {
    let csvData = await new FileHandler().readCsv("/tests/files/csv/utf8.csv");
    const df = new DataFrame(csvData);
    console.log(df.getData());
  } catch (err) {
    console.log(err);
  }
};
testCsv();

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

// Find the count of age of the dataframe
console.log("\nFind the count of age of the dataframe\n");
console.log(myDataFrame.count("age"));

// Find the count of score of the dataframe
console.log("\nFind the count of score of the dataframe\n");
console.log(myDataFrame.count("score"));

// Find the count of class of the dataframe
console.log("\nFind the count of class of the dataframe\n");
console.log(myDataFrame.count("class"));

// Find the count of the complete dataframe
console.log("\nFind the count of the complete dataframe\n");
console.log(myDataFrame.count());

// Find the sum of age of the dataframe
console.log("\nFind the sum of age of the dataframe\n");
console.log(myDataFrame.sum("age"));

// Find the sum of score of the dataframe
console.log("\nFind the sum of score of the dataframe\n");
console.log(myDataFrame.sum("score"));

// Find the sum of class of the dataframe
console.log("\nFind the sum of class of the dataframe\n");
console.log(myDataFrame.sum("class"));

// Find the sum of the complete dataframe
console.log("\nFind the sum of the complete dataframe\n");
console.log(myDataFrame.sum());

// Find the min age of the dataframe
console.log("\nFind the min age of the dataframe\n");
console.log(myDataFrame.min("age"));

// Find the min score of the dataframe
console.log("\nFind the min score of the dataframe\n");
console.log(myDataFrame.min("score"));

// Find the min class of the dataframe
console.log("\nFind the min class of the dataframe\n");
console.log(myDataFrame.min("class"));

// Find the min of the complete dataframe
console.log("\nFind the min of the complete dataframe\n");
console.log(myDataFrame.min());

// Find the max age of the dataframe
console.log("\nFind the max age of the dataframe\n");
console.log(myDataFrame.max("age"));

// Find the max score of the dataframe
console.log("\nFind the max score of the dataframe\n");
console.log(myDataFrame.max("score"));

// Find the max class of the dataframe
console.log("\nFind the max class of the dataframe\n");
console.log(myDataFrame.max("class"));

// Find the max of the complete dataframe
console.log("\nFind the max of the complete dataframe\n");
console.log(myDataFrame.max());

// Find the mean age of the dataframe
console.log("\nFind the mean age of the dataframe\n");
console.log(myDataFrame.mean("age"));

// Find the mean score of the dataframe
console.log("\nFind the mean score of the dataframe\n");
console.log(myDataFrame.mean("score"));

// Find the mean class of the dataframe
console.log("\nFind the mean class of the dataframe\n");
console.log(myDataFrame.mean("class"));

// Find the mean of the complete dataframe
console.log("\nFind the mean of the complete dataframe\n");
console.log(myDataFrame.mean());

// Find the median age of the dataframe
console.log("\nFind the median age of the dataframe\n");
console.log(myDataFrame.median("age"));

// Find the median score of the dataframe
console.log("\nFind the median score of the dataframe\n");
console.log(myDataFrame.median("score"));

// Find the median class of the dataframe
console.log("\nFind the median class of the dataframe\n");
console.log(myDataFrame.median("class"));

// Find the median of the complete dataframe
console.log("\nFind the median of the complete dataframe\n");
console.log(myDataFrame.median());

// Find the mode age of the dataframe
console.log("\nFind the mode age of the dataframe\n");
console.log(myDataFrame.mode("age"));

// Find the mode score of the dataframe
console.log("\nFind the mode score of the dataframe\n");
console.log(myDataFrame.mode("score"));

// Find the mode class of the dataframe
console.log("\nFind the mode class of the dataframe\n");
console.log(myDataFrame.mode("class"));

// Find the mode of the complete dataframe
console.log("\nFind the mode of the complete dataframe\n");
console.log(myDataFrame.mode());

// Find the variance age of the dataframe
console.log("\nFind the variance age of the dataframe\n");
console.log(myDataFrame.variance("age"));

// Find the variance score of the dataframe
console.log("\nFind the variance score of the dataframe\n");
console.log(myDataFrame.variance("score"));

// Find the variance class of the dataframe
console.log("\nFind the variance class of the dataframe\n");
console.log(myDataFrame.variance("class"));

// Find the variance of the complete dataframe
console.log("\nFind the variance of the complete dataframe\n");
console.log(myDataFrame.variance());

// Find the standard deviation age of the dataframe
console.log("\nFind the standard deviation age of the dataframe\n");
console.log(myDataFrame.standardDeviation("age"));

// Find the standard deviation score of the dataframe
console.log("\nFind the standard deviation score of the dataframe\n");
console.log(myDataFrame.standardDeviation("score"));

// Find the standard deviation class of the dataframe
console.log("\nFind the standard deviation class of the dataframe\n");
console.log(myDataFrame.standardDeviation("class"));

// Find the standard deviation of the complete dataframe
console.log("\nFind the standard deviation of the complete dataframe\n");
console.log(myDataFrame.standardDeviation());
