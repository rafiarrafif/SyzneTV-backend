import Elysia, { Context } from "elysia";
import { returnErrorResponse } from "../../helpers/callback/httpResponse";

export const appAccessTokenMiddleware = () =>
  new Elysia().onRequest(({ request, set }) => {
    const headerToken = request.headers.get("access_token");
    const storedToken = process.env.API_KEY;

    if (headerToken !== storedToken) {
      return returnErrorResponse(set, 403, "Unauthorized");
    }
  });
