import { execSync } from "child_process";

const remotes = ["origin"];

for (const remote of remotes) {
  console.log(`Pushing to ${remote}...`);
  try {
    execSync(`git push ${remote} main`, { stdio: "inherit" });
  } catch (err) {
    console.error(`❌ Failed to push to ${remote}`);
  }
}
console.log("✅ All remotes processed.");
