#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require("child_process");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const inquirer = require("inquirer");

(async function main() {
  try {
    console.log("Running lint...");

    execSync("npm run lint", { stdio: "inherit" });
    console.log("Lint passed! Proceeding with commit.");
    process.exit(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    console.log("\nLint errors detected.\n", error.message);

    const isFormatAnswer = await inquirer.prompt([
      {
        type: "confirm",
        name: "format",
        message: "Would you like to run 'npm run format' to fix issues?",
        default: false,
      },
    ]);

    if (isFormatAnswer.format) {
      console.log("\nRunning format...");

      try {
        execSync("npm run format", { stdio: "inherit" });
        execSync("npm run lint:fix", { stdio: "inherit" });
        console.log("\nFormat complete. Please re-add files and commit.");
        process.exit(1);
      } catch (formatError) {
        console.error("\nError while formatting:", formatError.message);
        process.exit(1);
      }
    } else {
      console.log("\nCommit aborted due to lint errors.");
      process.exit(1);
    }
  }
})();
