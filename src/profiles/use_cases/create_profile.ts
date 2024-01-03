import { client } from "../../lib/prisma";

export const createProfile = async (input: {
  userId: string,
  name: string,
  email: string,
  imageUrl: string,
}) => {
  const alreadyExists = await client.profile.findFirst({
    where: {
      userId: input.userId,
    },
  });

  if (alreadyExists) {
    throw new Error("profile already exist");
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
