import { object, string, email } from "valibot";

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
