import { generateUUIDv7 } from "./uuidv7";

function createManyWithUUID<T extends { id?: string }>(items: T[]): T[] {
  return items.map((i) => ({
    ...i,
    id: i.id ?? generateUUIDv7(),
  }));
}
