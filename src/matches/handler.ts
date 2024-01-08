import { Hono } from "hono";
import { parse } from "valibot";

import * as schemas from "./schemas";
import * as repository from "./repository";

const app = new Hono();

app.get("/", async (c) => {
  const matches = await repository.getMatches();
  return c.json(matches);
});

app.get("/:id", async (c) => {
  const match = await repository.getMatch({ id: c.req.param("id") });
  return c.json(match);
});

app.post("/", async (c) => {
  const input = parse(schemas.CreateMatchSchema, await c.req.json());
  const createdMatch = await repository.createMatch(input);
  return c.json(createdMatch);
});

app.patch("/:id", async (c) => {
  const input = parse(schemas.UpdateMatchSchema, await c.req.json());
  const updatedMatch = await repository.updateMatch({
    id: c.req.param("id"),
    data: input,
  });
  return c.json(updatedMatch);
});

app.delete("/:id", async (c) => {
  const deletedMatch = await repository.deleteMatch({ id: c.req.param("id") });
  return c.json(deletedMatch);
});

export default app;
