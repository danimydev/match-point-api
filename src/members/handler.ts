import { Hono } from "hono";
import { parse } from "valibot";

import * as repository from "./repository";
import { CreateMemberSchema } from "./schemas";

const app = new Hono();

app.get("/", async (c) => {
  const members = await repository.getMembers();
  return c.json(members);
});

app.get("/:id", async (c) => {
  const member = await repository.getMember({ id: c.req.param("id") });
  return c.json(member);
});

app.post("/", async (c) => {
  const input = parse(CreateMemberSchema, await c.req.json());
  const member = repository.createMember(input);
  return c.json(member);
});

app.delete("/:id", async (c) => {
  const deleted = await repository.deleteMember({ id: c.req.param("id") });
  return c.json(deleted);
});

export default app;
