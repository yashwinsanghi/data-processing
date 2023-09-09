// File Partially Generated by AI
import { DataFrame } from "../../src/dataFrame";

describe("writeCsv function", () => {
  it("should write a CSV file", async () => {
    expect.assertions(3);
    const data = [
      { Name: "John Doe", Age: 30, Email: "john@example.com" },
      { Name: "Jane Doe", Age: 25, Email: "jane@example.com" },
    ];

    try {
      const df = new DataFrame(data);
      await df.toCsv("test.csv");

      // Now, you can add assertions to check if the file was created correctly
      // For example, you can use fs.readFileSync to check the contents of the file
      // and make assertions based on the expected content.
      // Example assertion:
      const fs = require("fs");
      const content = fs.readFileSync("test.csv", "utf8");
      expect(content).toContain("Name,Age,Email");
      expect(content).toContain("John Doe");
      expect(content).toContain("john@example.com");

      // Clean up: Delete the test file after the test
      fs.unlinkSync("test.csv");
    } catch (err) {
      expect(err).toBeUndefined();
      console.log(err);
    }
  });
});

describe("writeJSON function", () => {
  it("should write a JSON file", async () => {
    const data = [{ name: "John Doe", age: 30, email: "john@example.com" }];
    try {
      const df = new DataFrame(data);
      const filePath = "test.json";
      await df.toJson(filePath);
      // Now, you can add assertions to check if the file was created correctly
      // For example, you can use fs.readFileSync to check the contents of the file
      // and make assertions based on the expected content.
      // Example assertion:
      const fs = require("fs");
      const content = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(content);
      expect(jsonData).toEqual(data);

      // Clean up: Delete the test file after the test
      fs.unlinkSync(filePath);
    } catch (er) {
      expect(er).toBeUndefined();
      console.log(er);
    }
  });
});