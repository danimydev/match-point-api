import { object, string } from "valibot";

export const CreateTeamSchema = object({
  name: string(),
  imageUrl: string(),
  inviteCode: string(),
  profileId: string(),
});

export const UpdateTeamSchema = object({
  name: string(),
  imageUrl: string(),
  inviteCode: string(),
});
