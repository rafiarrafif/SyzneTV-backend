/**
 * Dynamically aggregates Elysia sub-routes from modular directories into a central registry.
 *
 * @behavior
 * 1. Scans `./src/modules` for valid Elysia modules
 * 2. Generates imports and `.use()` calls for each module
 * 3. Writes composed routes to `./src/routes.ts`
 *
 * @requirements
 * - Module directories must contain an export named `[folderName]Module`
 *   (e.g., `userModule` for `/user` folder)
 * - Modules must export an Elysia instance
 *
 * @outputfile ./src/routes.ts
 * @examplegenerated
 * ```ts
 * import Elysia from "elysia";
 * import { userModule } from './modules/user';
 * import { authModule } from './modules/auth';
 *
 * const routes = new Elysia()
 *       .use(userModule)
 *       .use(authModule);
 *
 * export { routes };
 * ```
 */
import { writeFileSync, readdirSync } from "fs";
import { join } from "path";

const modulesPath = "./src/modules";
const importLines: string[] = [];
const useLines: string[] = [];

for (const folder of readdirSync(modulesPath, { withFileTypes: true })) {
  if (folder.isDirectory()) {
    const varName = `${folder.name}Module`;
    importLines.push(`import {${varName}} from './modules/${folder.name}';`);
    useLines.push(`.use(${varName})`);
  }
}

const content = `
import Elysia from "elysia";
${importLines.join("\n")}
const routes = new Elysia()
${useLines.join("\n")};
export { routes };
`;

writeFileSync(join(modulesPath, "../routes.ts"), content);
