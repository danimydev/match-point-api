import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ValiError, flatten, parse } from "valibot";

import {
  DeleteProfileByIdSchema,
  GetProfileByIdSchema,
  PostProfileSchema,
  UpdateProfileSchema,
} from "./schemas";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
} from "./use_cases";
import { deleteProfile } from "./use_cases/delete_profile";

const app = new Hono();

app.get("/", async (c) => {
  const profiles = await getProfiles();
  return c.json(profiles);
});

app.get("/:id", async (c) => {
  const input = parse(GetProfileByIdSchema, { id: c.req.param("id") });
  const profile = await getProfileById(input);
  return c.json(profile);
});

app.post("/", async (c) => {
  try {
    const input = parse(PostProfileSchema, await c.req.json());
    const createdProfile = await createProfile(input);
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
    const updatedProfile = await updateProfile(input);
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
    const input = parse(DeleteProfileByIdSchema, {
      id: c.req.param("id"),
    });
    const deletedProfile = await deleteProfile(input);
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
  return c.text(`deleted profile ${c.req.param("id")}`);
});

export default app;
