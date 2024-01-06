import { client } from "../lib/prisma";

export const getProfiles = async () => {
  return await client.profile.findMany();
}

export const getProfile = async (input: {
  id: string,
}) => {
  return await client.profile.findFirst({
    where: {
      id: input.id,
    },
  });
}

export const getProfileByUserId = async (input: {
  userId: string,
}) => {
  return await client.profile.findFirst({
    where: {
      userId: input.userId,
    },
  });
}

export const getProfileTeams = async (input: {
  id: string,
}) => {
  const profile = await client.profile.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!profile) {
    throw new Error(`profile`)
  }

  return await client.team.findMany({
    where: {
      profileId: profile.id,
    },
  });
}

export const createProfile = async (input: {
  userId: string,
  name: string,
  email: string,
  imageUrl: string,
}) => {
  const profile = await client.profile.findFirst({
    where: {
      userId: input.userId,
    },
  });

  if (profile) {
    throw new Error(`profile with userId ${input.userId} already exists`);
  }

  return await client.profile.create({
    data: {
      userId: input.userId,
      name: input.name,
      email: input.email,
      imageUrl: input.imageUrl,
    },
  });
}

export const updateProfile = async (input: {
  id: string,
  data: {
    name?: string,
    email?: string,
    imageUrl?: string,
  },
}) => {
  const profile = await client.profile.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!profile) {
    throw new Error(`profile ${input.id} not found`);
  }

  return await client.profile.update({
    where: {
      id: input.id,
    },
    data: {
      email: input.data.email || profile.email,
      name: input.data.name || profile.name,
      imageUrl: input.data.imageUrl || profile.imageUrl,
    },
  });
}

export const deleteProfile = async (input: {
  id: string,
}) => {
  const profile = await client.profile.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!profile) {
    throw new Error(`profile ${input.id} not found`);
  }

  return await client.profile.delete({
    where: {
      id: input.id,
    },
  });
}

