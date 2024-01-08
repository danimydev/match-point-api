import { object, string, date, number } from "valibot";

export const CreateMatchSchema = object({
  startAt: date(),
  duration: number(),
  teamAId: string(),
  teamBId: string(),
  stadiumId: string(),
});

export const UpdateMatchSchema = object({
  startAt: date(),
  duration: number(),
});
