import { client } from "../../lib/prisma";

export const getTeams = async () => {
  return await client.team.findMany();
}
