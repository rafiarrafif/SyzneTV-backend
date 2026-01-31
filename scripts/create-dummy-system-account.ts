import { generateUUIDv7 } from "../src/helpers/databases/uuidv7";
import { createFile } from "../src/helpers/files/createFile";

export const createDummySystemAccount = async () => {
  await createFile(`export const SystemAccountId = "${generateUUIDv7()}";`, {
    fileName: "system.ts",
    targetDir: "src/config/account",
    overwriteIfExists: true,
  });
};
