import { Hono } from "hono";
import { ValiError, parse } from "valibot";

import { PatchTeamSchema, PostTeamSchema } from "./schemas";
import * as repository from "./repository";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", async (c) => {
  const teams = await repository.getTeams();
  return c.json(teams);
});

app.get("/:id", async (c) => {
  const team = await repository.getTeamById({ id: c.req.param("id") });
  return c.json(team);
});

app.post("/", async (c) => {
  try {
    const input = parse(PostTeamSchema, await c.req.json());
    const createdTeam = await repository.createTeam(input);
    return c.json(createdTeam);
  } catch (error) {
    if ((error as ValiError).issues) {
      throw new Error("invalid input");
    }
    throw error;
  }
});

app.patch("/:id", async (c) => {
  try {
    const input = parse(PatchTeamSchema, {
      id: c.req.param("id"),
      data: await c.req.json(),
    });
    const updatedTeam = await repository.updateTeam(input);
    return c.json(updatedTeam);
  } catch (error) {
    if ((error as Error).message === "") {
      throw new HTTPException(400, {
        message: (error as Error).message,
      });
    }
    if ((error as ValiError).issues) {
      throw new Error("invalid input");
    }
    throw error;
  }
});

app.delete("/:id", async (c) => {
  const deletedTeam = await repository.deleteTeam({
    id: c.req.param("id"),
  });
  return c.json(deletedTeam);
});

export default app;
