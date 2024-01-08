import { client } from "../lib/prisma";

export const getMatches = async () => {
  return await client.match.findMany();
}

export const getMatch = async (input: {
  id: string,
}) => {
  return await client.match.findFirst({
    where: {
      id: input.id,
    },
  });
}

export const createMatch = async (input: {
  startAt: Date,
  duration: number,
  teamAId: string,
  teamBId: string,
  stadiumId: string,
}) => {
  return await client.match.create({
    data: {
      startAt: input.startAt,
      duration: input.duration,
      teamAId: input.teamAId,
      teamBId: input.teamBId,
      stadiumId: input.stadiumId,
    },
  });
}

export const updateMatch = async (input: {
  id: string,
  data: {
    startAt: Date,
    duration: number,
  },
}) => {
  const match = await client.match.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!match) {
    throw new Error(`match ${input.id} not found`);
  }

  return await client.match.update({
    where: {
      id: input.id,
    },
    data: {
      startAt: input.data.startAt || match.startAt,
      duration: input.data.duration || match.duration,
    },
  });
}

export const deleteMatch = async (input: {
  id: string,
}) => {
  const match = await client.match.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!match) {
    throw new Error(`match ${input.id} not found`);
  }

  return await client.match.delete({
    where: {
      id: input.id,
    },
  });
}
