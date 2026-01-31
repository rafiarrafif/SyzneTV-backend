import Elysia from "elysia";
import { returnErrorResponse } from "../../helpers/callback/httpResponse";

export const appAccessTokenMiddleware = () =>
  new Elysia().onRequest(({ request, set }) => {
    const headerToken = request.headers.get("authorization");
    if (!headerToken) return returnErrorResponse(set, 401, "Unauthorized");

    const storedToken = process.env.API_KEY;
    const [scheme, token] = headerToken.split(" ");

    if (scheme !== "Bearer" || !token)
      return returnErrorResponse(set, 401, "Invalid auth format");
    if (token !== storedToken)
      return returnErrorResponse(set, 403, "Forbidden");
  });
