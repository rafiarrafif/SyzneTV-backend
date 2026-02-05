export const serializeBigInt = <T>(data: T): T => {
  return JSON.parse(
    JSON.stringify(data, (_, v) => (typeof v === "bigint" ? Number(v) : v)),
  );
};
