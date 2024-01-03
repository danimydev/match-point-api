import { client } from "../../lib/prisma";

export const getTeamById = async (input: {
  id: string,
}) => {
  return await client.team.findFirst({
    where: {
      id: input.id,
    },
  });
}
