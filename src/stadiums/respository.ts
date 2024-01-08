import { client } from "../lib/prisma";

export const getStadiums = async () => {
  return await client.stadium.findMany();
}

export const getStadium = async (input: {
  id: string,
}) => {
  return await client.stadium.findFirst({
    where: {
      id: input.id,
    },
  });
}

export const getStadiumMatches = async (input: {
  id: string,
}) => {
  return await client.match.findMany({
    where: {
      stadiumId: input.id,
    },
  });
}

export const createStadium = async (input: {
  name: string,
  picture: string,
}) => {
  const stadium = await client.stadium.findFirst({
    where: {
      name: input.name,
    },
  });

  if (stadium) {
    throw new Error(`stadium ${input.name} already exists`);
  }

  return await client.stadium.create({
    data: {
      name: input.name,
      picture: input.picture,
    },
  });
}

export const updateStadium = async (input: {
  id: string,
  data: {
    name: string,
    picture: string,
  }
}) => {
  const stadium = await client.stadium.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!stadium) {
    throw new Error(`stadium ${input.id} not found`);
  }

  const stadiumWithName = await client.stadium.findFirst({
    where: {
      name: input.data.name,
    },
  });

  if (stadiumWithName) {
    throw new Error(`stadium with name ${input.data.name} already exists`);
  }

  return await client.stadium.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.data.name || stadium.name,
      picture: input.data.picture || stadium.picture,
    },
  });
}

export const deleteStadium = async (input: {
  id: string,
}) => {
  const stadium = await client.stadium.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!stadium) {
    throw new Error(`stadium ${input.id} not found`);
  }

  return await client.stadium.delete({
    where: {
      id: input.id,
    },
  });
}
