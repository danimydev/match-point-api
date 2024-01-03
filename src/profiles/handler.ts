import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ValiError, parse } from "valibot";

import {
  PostProfileSchema,
  UpdateProfileSchema,
} from "./schemas";
import * as repository from "./repository";

const app = new Hono();

app.get("/", async (c) => {
  const profiles = await repository.getProfiles();
  return c.json(profiles);
});

app.get("/:id", async (c) => {
  const profile = await repository.getProfileById({
    id: c.req.param("id"),
  });
  return c.json(profile);
});

app.post("/", async (c) => {
  try {
    const input = parse(PostProfileSchema, await c.req.json());
    const createdProfile = await repository.createProfile(input);
    return c.json(createdProfile);
  } catch (error) {
    if ((error as Error).message === "profile already exist") {
      throw new HTTPException(400, {
        message: (error as Error).message,
      });
    }
    throw error;
  }
});

app.patch("/:id", async (c) => {
  try {
    const input = parse(UpdateProfileSchema, {
      id: c.req.param("id"),
      data: await c.req.json(),
    });
    const updatedProfile = await repository.updateProfile(input);
    return c.json(updatedProfile);
  } catch (error) {
    if ((error as Error).message === "profile does not exist") {
      throw new HTTPException(400, {
        message: (error as Error).message,
      });
    }
    if ((error as ValiError).issues.length) {
      throw new HTTPException(400, {
        message: "invalid input",
      });
    }
    throw error;
  }
});

app.delete("/:id", async (c) => {
  try {
    const deletedProfile = await repository.deleteProfile({
      id: c.req.param("id"),
    });
    return c.json(deletedProfile);
  } catch (error) {
    if ((error as Error).message === "profile does not exist") {
      throw new HTTPException(400, {
        message: (error as Error).message,
      });
    }
    if ((error as ValiError).issues.length) {
      throw new HTTPException(400, {
        message: "invalid input",
      });
    }
    throw error;
  }
});

export default app;
