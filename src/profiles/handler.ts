import { Hono } from "hono";
import { parse } from "valibot";

import * as schemas from "./schemas";
import * as repository from "./repository";

const app = new Hono();

app.get("/", async (c) => {
  const profiles = await repository.getProfiles();
  return c.json(profiles);
});

app.get("/:id", async (c) => {
  const profile = await repository.getProfile({
    id: c.req.param("id"),
  });
  return c.json(profile);
});

app.get("/:id/teams", async (c) => {
  const profileTeams = await repository.getProfileTeams({
    id: c.req.param("id"),
  });
  return c.json(profileTeams);
});

app.get("/:id/members", async (c) => {
  const profileMembers = await repository.getProfileMembers({
    id: c.req.param("id"),
  });
  return c.json(profileMembers);
});

app.get("/:id/external", async (c) => {
  const profile = await repository.getProfileByUserId({
    userId: c.req.param("id"),
  });
  return c.json(profile);
});

app.post("/", async (c) => {
  const input = parse(schemas.CreateProfileSchema, await c.req.json());
  const createdProfile = await repository.createProfile(input);
  return c.json(createdProfile);
});

app.patch("/:id", async (c) => {
  const input = parse(schemas.UpdateProfileSchema, await c.req.json());
  const updatedProfile = await repository.updateProfile({
    id: c.req.param("id"),
    data: input,
  });
  return c.json(updatedProfile);
});

app.delete("/:id", async (c) => {
  const deletedProfile = await repository.deleteProfile({
    id: c.req.param("id"),
  });
  return c.json(deletedProfile);
});

export default app;
