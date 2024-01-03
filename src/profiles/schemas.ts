import { object, string, email, minLength } from "valibot";

export const GetProfileByIdSchema = object({
  id: string(),
});

export const PostProfileSchema = object({
  userId: string(),
  name: string(),
  email: string([email()]),
  imageUrl: string(),
});

export const UpdateProfileSchema = object({
  id: string(),
  data: object({
    name: string(),
    email: string([email()]),
    imageUrl: string(),
  }),
});

export const DeleteProfileByIdSchema = object({
  id: string(),
});
