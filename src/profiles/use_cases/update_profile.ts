import { client } from "../../lib/prisma";

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
    throw new Error("profile does not exist");
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
