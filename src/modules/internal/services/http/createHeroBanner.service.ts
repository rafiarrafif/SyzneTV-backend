import { Static } from "elysia";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { insertHeroBannerRepository } from "../../repositories/insertHeroBanner.repository";
import { createHeroBannerSchema } from "../../schemas/createHeroBanner.schema";

export const createHeroBannerService = async (payload: Static<typeof createHeroBannerSchema.body>) => {
  try {
    return await insertHeroBannerRepository(payload);
  } catch (error) {
    ErrorForwarder(error);
  }
};
