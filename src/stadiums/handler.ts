import { Hono } from "hono";
import { parse } from "valibot";

import * as schemas from "./schemas";
import * as repository from "./respository";

const app = new Hono();

app.get("/", async (c) => {
  const stadiums = await repository.getStadiums();
  return c.json(stadiums);
});

app.get("/:id", async (c) => {
  const stadium = await repository.getStadium({
    id: c.req.param("id"),
  });
  return c.json(stadium);
});

app.get("/:id/matches", async (c) => {
  const stadiumMatches = await repository.getStadiumMatches({
    id: c.req.param("id"),
  });
  return c.json(stadiumMatches);
});

app.post("/", async (c) => {
  const input = parse(schemas.UpdateStadiumSchema, await c.req.json());
  const createdStadium = await repository.createStadium(input);
  return c.json(createdStadium);
});

app.patch("/:id", async (c) => {
  const input = parse(schemas.UpdateStadiumSchema, await c.req.json());
  const updatedStadium = await repository.updateStadium({
    id: c.req.param("id"),
    data: input,
  });
  return c.json(updatedStadium);
});

app.delete("/:id", async (c) => {
  const deletedStadium = await repository.deleteStadium({ id: c.req.param("id") });
  return c.json(deletedStadium);
});

export default app;
