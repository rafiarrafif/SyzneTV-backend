import fs from "fs";
import path from "path";

// These keys will not be cleared in the .env.example file
const PRESERVED_KEYS = [
  "APP_NAME",
  "APP_ENV",
  "PORT",
  "API_KEY",
  "ALLOWED_ORIGINS",
  "REDIS_HOST",
  "REDIS_PORT",
];

/**
 * Script to create or update the .env.example file based on the .env file.
 * It preserves certain keys and clears their values in the .env.example file.
 */
try {
  // Define paths for .env and .env.example files
  const envPath = path.join(process.cwd(), ".env");
  const envExamplePath = path.join(process.cwd(), ".env.example");

  // Check if the .env file exists. if not, log an error and exit
  if (!fs.existsSync(envPath)) {
    console.error(`.env file not found at ${envPath}`);
    process.exit(1);
  }

  // Read the contents of the .env file
  const envContent = fs.readFileSync(envPath, "utf-8");

  // Split the content into lines and process each line
  const lines = envContent.split("\n");
  const processedLines = lines.map((line) => {
    const trimmedLine = line.trim();

    // Preserve comments and empty lines as-is
    if (trimmedLine.startsWith("#") || trimmedLine === "") {
      return line;
    }

    // Find the first "=" delimiter to separate key and value
    const delimiterIndex = line.indexOf("=");

    // If there's no "=", treat the line as-is
    if (delimiterIndex === -1) {
      return line;
    }

    // Extract the key and the remainder after "="
    const key = line.substring(0, delimiterIndex).trim();
    const remainder = line.substring(delimiterIndex + 1);

    // Attempt to separate value and inline comment (if any)
    let value = remainder;
    let comment = "";

    // Look for an inline comment that starts with " #"
    const commentIndex = remainder.indexOf(" #");
    if (commentIndex !== -1) {
      value = remainder.substring(0, commentIndex).trim(); // Extract the actual value
      comment = remainder.substring(commentIndex); // Preserve the comment
    }

    // If key is in the preserved list, keep the value and comment
    if (PRESERVED_KEYS.includes(key)) {
      return `${key}=${value}${comment}`;
    }

    // Otherwise, clear the value but preserve the comment
    return `${key}=${comment}`;
  });

  // Write the processed lines into the .env.example file
  fs.writeFileSync(envExamplePath, processedLines.join("\n"));
  console.log("File .env.example berhasil diperbarui!");
} catch (error) {
  // Catch and log any unexpected errors
  console.error("Error while creating .env.example:", error);
  process.exit(1);
}
