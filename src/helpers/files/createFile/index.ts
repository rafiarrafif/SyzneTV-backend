import fs from "fs";
import path from "path";

interface CreateFileConfig {
  targetDir: string;
  fileName: string;
  overwriteIfExists?: boolean;
}

export const createFile = async (content: string, config: CreateFileConfig) => {
  const targetDir = path.join(process.cwd(), config.targetDir);
  const targetFile = path.join(targetDir, config.fileName);

  // If file exists and overwrite is not allowed, throw an error
  if (fs.existsSync(targetFile) && !config.overwriteIfExists) {
    throw new Error(
      `File ${config.fileName} already exists in ${config.targetDir}`,
    );
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    await fs.promises.mkdir(targetDir, { recursive: true });
  }

  // Write content to the file
  await fs.promises.writeFile(targetFile, content, "utf8");
};
