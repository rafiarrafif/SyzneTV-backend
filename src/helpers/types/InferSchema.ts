import { Static } from "elysia";

export type InferSchema<S> = {
  body: S extends { body: any } ? Static<S["body"]> : never;
  query: S extends { query: any } ? Static<S["query"]> : never;
  params: S extends { params: any } ? Static<S["params"]> : never;
  headers: S extends { headers: any } ? Static<S["headers"]> : never;
};
