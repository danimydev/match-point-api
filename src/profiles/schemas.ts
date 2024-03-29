import { object, string, email } from "valibot";

export const CreateProfileSchema = object({
  userId: string(),
  name: string(),
  email: string([email()]),
  imageUrl: string(),
});

export const UpdateProfileSchema = object({
  name: string(),
  email: string([email()]),
  imageUrl: string(),
});
