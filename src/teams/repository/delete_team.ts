import { client } from "../../lib/prisma";

export const deleteTeam = async (input: {
  id: string,
}) => {
  const alreadyExists = await client.team.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!alreadyExists) {
    throw new Error("team does not exist");
  }

  return await client.team.delete({
    where: {
      id: input.id,
    },
  });
}
