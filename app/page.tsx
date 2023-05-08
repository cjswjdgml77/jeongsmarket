import getCurrentUser from "./actions/getCurrentUser";
import getUsedItems from "./actions/getUsedItems";
import Container from "./components/Container";
import Categories from "./components/category/Categories";
import Header from "./components/header/Header";
import UsedItemCard from "./components/usedItem/UsedItemCard";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const usedItems = await getUsedItems();
  return (
    <>
      <Container>
        <Header />
        <Categories />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-10">
          {usedItems &&
            usedItems.length > 0 &&
            usedItems.map((item) => (
              <UsedItemCard
                key={item.title}
                data={item}
                currentUser={currentUser}
              />
            ))}
        </div>
      </Container>
    </>
  );
}
