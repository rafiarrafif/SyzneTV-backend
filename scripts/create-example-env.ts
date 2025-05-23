import fs from "fs";
import path from "path";

const PRESERVED_KEYS = [
  "APP_NAME",
  "APP_ENV",
  "PORT",
  "API_KEY",
  "ALLOWED_ORIGINS",
  "REDIS_HOST",
  "REDIS_PORT",
];

try {
  const envPath = path.join(process.cwd(), ".env");
  const envExamplePath = path.join(process.cwd(), ".env.example");

  if (!fs.existsSync(envPath)) {
    console.error(`.env file not found at ${envPath}`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf-8");

  const lines = envContent.split("\n");
  const processedLines = lines.map((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("#") || trimmedLine === "") {
      return line;
    }

    const delimeterIndex = line.indexOf("=");
    if (delimeterIndex === -1) {
      return line;
    }

    const key = line.substring(0, delimeterIndex).trim();
    const value = line.substring(delimeterIndex + 1).trim();

    if (PRESERVED_KEYS.includes(key)) {
      return `${key}=${value}`;
    }
    return `${key}=`;
  });

  fs.writeFileSync(envExamplePath, processedLines.join("\n"));
  console.log("File .env.example berhasil diperbarui!");
} catch (error) {
  console.error("Error while creating .env.example:", error);
  process.exit(1);
}
