import { client } from "../lib/prisma";

export const getTeams = async () => {
  return await client.team.findMany();
}

export const getTeam = async (input: {
  id: string,
}) => {
  return await client.team.findFirst({
    where: {
      id: input.id,
    },
  });
}

export const getTeamMembers = async (input: {
  id: string,
}) => {
  return await client.member.findMany({
    where: {
      teamId: input.id,
    },
  });
}

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
