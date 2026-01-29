import fs from "fs";

export const validateEnv = () => {
  console.log("🔍 Validating environment variables...");
  if (!fs.existsSync(".env")) {
    if (fs.existsSync(".env.example")) {
      console.error("⚠️ .env file not found");
      console.warn("📝 Creating .env file from .env.example, please wait...");
      fs.copyFileSync(".env.example", ".env");
      console.warn(
        "🖊️ .env file successfully created please fill in the value in each key needed",
      );
      process.exit(1);
    } else {
      console.error(
        `❌ Can't validate environment variable because can't find .env.example file. seems to be missing files please re-pull with “git pull main”`,
      );
      process.exit(1);
    }
  }

  const exampleKeys = fs
    .readFileSync(".env.example", "utf-8")
    .split("\n")
    .map((line) => line.split("=")[0].trim())
    .filter((key) => key && !key.startsWith("#"));

  const missingKeys = exampleKeys.filter(
    (key) => !process.env[key] || process.env[key].trim() === "",
  );

  if (missingKeys.length > 0) {
    console.error("❌ ENV error - missing key:");
    missingKeys.forEach((k) => console.error(`   - ${k}`));
    console.error(`check your .env file and make sure all keys are filled in`);
    process.exit(1);
  }

  console.log("✅ Environment variables are valid.");
};
