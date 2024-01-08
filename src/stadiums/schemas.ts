import { object, string } from "valibot";

export const CreateStadiumSchema = object({
  name: string(),
  picture: string(),
  address: string(),
});

export const UpdateStadiumSchema = object({
  name: string(),
  picture: string(),
  address: string(),
});
