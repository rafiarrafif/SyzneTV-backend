import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const getActiveHeroBannerSchema = {
  headers: t.Object({
    cookie: t.Optional(t.String()),
  }),
} satisfies AppRouteSchema;
