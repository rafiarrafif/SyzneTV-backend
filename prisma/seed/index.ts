import { prisma } from "../../src/utils/databases/prisma/connection";
import { userRoleSeed } from "./userRole.seed";
import { userSystemSeed } from "./userSystem.seed";

async function main() {
  console.log("🌱 Running all seeds...");
  console.log("🔌 Connecting to database...");

  await userSystemSeed();
  await userRoleSeed();

  console.log("🌳 All seeds completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log(
      "🔌 Disconnecting from database (this may take a few seconds)...",
    );
    await prisma.$disconnect();
  });
