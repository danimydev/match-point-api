import { client } from "../../lib/prisma";

export const createTeam = async (input: {
  name: string,
  imageUrl: string,
  inviteCode: string,
  profileId: string,
}) => {
  return await client.team.create({
    data: {
      name: input.name,
      imageUrl: input.imageUrl,
      inviteCode: input.inviteCode,
      profileId: input.profileId,
    }
  });
}
