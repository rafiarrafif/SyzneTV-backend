import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    $allModels: {
      async create({ args, query }) {
        if (
          args.data &&
          typeof args.data === "object" &&
          !("id" in args.data)
        ) {
          // do nothing
        } else if (args.data && !args.data.id) {
          (args.data as { id?: string }).id = generateUUIDv7();
        }
        return query(args);
      },
      async upsert({ args, query }) {
        const create = args.create as any;
        if (create && !create.id) create.id = generateUUIDv7();
        return query(args);
      },
    },
  },
});
