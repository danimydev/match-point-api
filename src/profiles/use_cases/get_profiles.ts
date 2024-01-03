import { client } from "../../lib/prisma";

export const getProfiles = async () => {
  return await client.profile.findMany();
}
