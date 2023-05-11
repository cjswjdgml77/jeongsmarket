import client from "../lib/prismadb";

export default async function getUsedItems(category: string) {
  try {
    let lists;
    let include = { images: true, comments: true, favorites: true };
    if (!category) {
      lists = await client.usedItem.findMany({
        take: 15,
        include: include,
      });
    } else {
      lists = await client.usedItem.findMany({
        skip: 1,
        take: 15,
        where: {
          category: { has: category },
        },
        include: include,
      });
    }
    return lists;
  } catch (e) {
    return null;
  }
}

export const getUsedItem = async (id: string) => {
  try {
    const detail = await client.usedItem.findUnique({
      where: { id: id },
      include: {
        images: true,
        user: true,
        favorites: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    return detail;
  } catch (e) {
    console.log(e);
    return null;
  }
};
