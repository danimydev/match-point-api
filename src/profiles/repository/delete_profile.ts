import { client } from "../../lib/prisma";

export const deleteProfile = async (input: {
  id: string,
}) => {
  const alreadyExists = await client.profile.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!alreadyExists) {
    throw new Error("profile does not exist");
  }

  return await client.profile.delete({
    where: {
      id: input.id,
    },
  });
}
