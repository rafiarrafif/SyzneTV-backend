import { execSync } from "child_process";

/*
This script pushes the current branch to multiple remotes in a Git repository.
It is useful for deploying code to multiple servers or services at once.
Make sure you've set up your remotes correctly before running this script and do commit your changes first!
*/

const remotes = ["origin"]; // Add your remote names here, e.g., "origin", "vps", etc. if you have multiple remotes

// Start the push process
for (const remote of remotes) {
  console.log(`Pushing to ${remote}...`);
  try {
    execSync(`git push ${remote} main`, { stdio: "inherit" });
  } catch (err) {
    console.error(`❌ Failed to push to ${remote}`);
  }
}

// All remotes processed
console.log("✅ All remotes processed.");
