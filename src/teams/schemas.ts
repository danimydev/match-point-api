import { object, string } from "valibot";

export const PostTeamSchema = object({
  name: string(),
  imageUrl: string(),
  inviteCode: string(),
  profileId: string(),
});

export const PatchTeamSchema = object({
  id: string(),
  data: object({
    name: string(),
    imageUrl: string(),
    inviteCode: string(),
  }),
});
