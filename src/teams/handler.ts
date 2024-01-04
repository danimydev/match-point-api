import { Hono } from "hono";
import { parse } from "valibot";

import * as schemas from "./schemas";
import * as repository from "./repository";

const app = new Hono();

app.get("/", async (c) => {
  const teams = await repository.getTeams();
  return c.json(teams);
});

app.get("/:id", async (c) => {
  const team = await repository.getTeam({ id: c.req.param("id") });
  return c.json(team);
});

app.get("/:id/members", async (c) => {
  const members = await repository.getTeamMembers({ id: c.req.param("id") });
  return c.json(members);
});

app.post("/", async (c) => {
  const input = parse(schemas.CreateTeamSchema, await c.req.json());
  const createdTeam = await repository.createTeam(input);
  return c.json(createdTeam);
});

app.patch("/:id", async (c) => {
  const input = parse(schemas.UpdateTeamSchema, await c.req.json());
  const updatedTeam = await repository.updateTeam({
    id: c.req.param("id"),
    data: input,
  });
  return c.json(updatedTeam);
});

app.delete("/:id", async (c) => {
  const deletedTeam = await repository.deleteTeam({
    id: c.req.param("id"),
  });
  return c.json(deletedTeam);
});

export default app;
