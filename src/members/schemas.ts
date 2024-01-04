import { object, string } from "valibot";

export const CreateMemberSchema = object({
  teamId: string(),
  profileId: string(),
});

export const UpdateMemberSchema = object({
  teamId: string(),
});
