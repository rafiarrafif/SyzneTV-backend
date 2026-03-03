import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { redis } from "../../../../utils/databases/redis/connection";
import { findSystemPreferenceRepository } from "../repositories/findSystemPreference.repository";

export const findSystemPreferenceService = async (
  key: string,
  type: "boolean" | "string" | "number" = "string",
) => {
  try {
    // First, check if the system preference is exists in redis cache
    const cachedValue = await redis.get(
      `${process.env.APP_NAME}:configs:${key}`,
    );

    if (!cachedValue) {
      // If not exists in cache, fetch from database. If found, return the value and set it to cache, if not found, throw an error
      const systemPreference = await findSystemPreferenceRepository(key);
      if (!systemPreference)
        throw new AppError(404, "System preference not found");

      // and set it to cache for future requests
      await redis.set(
        `${process.env.APP_NAME}:configs:${key}`,
        systemPreference.value,
      );

      // Return the value from database
      return parseValue(systemPreference.value, type);
    } else {
      return parseValue(cachedValue, type);
    }
  } catch (error) {
    ErrorForwarder(error, 500, "Failed to find system preference");
  }
};

const parseValue = (value: string, type: "boolean" | "string" | "number") => {
  switch (type) {
    case "boolean":
      return value === "true";
    case "number":
      return Number(value);
    default:
      return value;
  }
};
