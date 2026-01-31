import { generateUUIDv7 } from "../src/helpers/databases/uuidv7";
import { createFile } from "../src/helpers/files/createFile";

const createDummySystemAccount = async () => {
  const file = await createFile(
    `export const SystemAccountId = "${generateUUIDv7()}";`,
    {
      fileName: "system.ts",
      targetDir: "src/config/account",
      overwriteIfExists: true,
    },
  );
  console.log(`Dummy system account created with id in file: ${file}`);
};

createDummySystemAccount();
