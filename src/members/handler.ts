import { Hono } from "hono";
import { parse } from "valibot";

import * as schemas from "./schemas";
import * as repository from "./repository";

const app = new Hono();

app.get("/", async (c) => {
  const members = await repository.getMembers();
  return c.json(members);
});

app.get("/:id", async (c) => {
  const member = await repository.getMember({
    id: c.req.param("id"),
  });
  return c.json(member);
});

app.post("/", async (c) => {
  const input = parse(schemas.CreateMemberSchema, await c.req.json());
  const member = await repository.createMember(input);
  return c.json(member);
});

app.patch("/:id", async (c) => {
  const input = parse(schemas.UpdateMemberSchema, await c.req.json());
  const updatedMember = repository.updateMember({
    id: c.req.param("id"),
    data: input,
  });
  return c.json(updatedMember);
});

app.delete("/:id", async (c) => {
  const deletedMember = await repository.deleteMember({
    id: c.req.param("id"),
  });
  return c.json(deletedMember);
});

export default app;
