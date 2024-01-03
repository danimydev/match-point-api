import { client } from "../../lib/prisma";

export const getProfileById = async (input: {
  id: string,
}) => {
  return await client.profile.findFirst({
    where: {
      id: input.id,
    },
  });
}
