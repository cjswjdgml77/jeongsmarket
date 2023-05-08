import client from "../lib/prismadb";

export default async function getUsedItems() {
  try {
    const lists = await client.usedItem.findMany({
      include: { images: true, comments: true, favorites: true },
    });
    return lists;
  } catch (e) {
    return null;
  }
}

export const getUsedItem = async (id: string) => {
  try {
    const detail = await client.usedItem.findUnique({
      where: { id: id },
    });
    return detail;
  } catch (e) {
    return null;
  }
};
