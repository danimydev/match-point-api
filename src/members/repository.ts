import { client } from "../lib/prisma";

export const getMembers = async () => {
  return await client.member.findMany();
}

export const getMember = async (input: {
  id: string,
}) => {
  return await client.member.findFirst({
    where: {
      id: input.id,
    },
  });
}

export const createMember = async (input: {
  profileId: string,
  teamId: string,
}) => {
  const profile = await client.profile.findFirst({
    where: {
      id: input.profileId,
    },
  });

  if (!profile) {
    throw new Error(`profile ${input.profileId} not found`);
  }

  const team = await client.team.findFirst({
    where: {
      id: input.teamId,
    },
  });

  if (!team) {
    throw new Error(`team ${input.teamId} not found`);
  }

  return await client.member.create({
    data: {
      profileId: profile.id,
      teamId: team.id,
    }
  });
}

export const deleteMember = async (input: {
  id: string,
}) => {
  return await client.member.delete({
    where: {
      id: input.id,
    },
  });
}
