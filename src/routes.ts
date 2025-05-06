import Elysia from "elysia";
import { pathToFileURL } from "bun";
import { readdirSync } from "fs";
import { join } from "path";

const routes = new Elysia();

const modulesPath = join(__dirname, "./modules");

for (const folder of readdirSync(modulesPath, { withFileTypes: true })) {
  if (folder.isDirectory()) {
    const moduleIndex = join(modulesPath, folder.name, "index.ts");

    try {
      const module = await import(pathToFileURL(moduleIndex).href);

      const mod = Object.values(module).find(
        (m): m is Elysia => m instanceof Elysia
      );

      if (mod) {
        routes.use(mod);
      }
    } catch (error) {
      console.warn(
        `Module ${folder.name} not found. Please check the module path or name.`
      );
    }
  }
}

export { routes };
