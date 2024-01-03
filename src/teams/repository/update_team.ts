import { client } from "../../lib/prisma";

export const updateTeam = async (input: {
  id: string,
  data: {
    name: string,
    imageUrl: string,
    inviteCode: string,
  },
}) => {
  const alreadyExists = await client.team.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!alreadyExists) {
    throw new Error("team does not exist");
  }

  return await client.team.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.data.name || alreadyExists.name,
      imageUrl: input.data.imageUrl || alreadyExists.imageUrl,
      inviteCode: input.data.inviteCode || alreadyExists.inviteCode,
    },
  });
}
