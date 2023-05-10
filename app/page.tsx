import MyLoading from "./MyLoading";
import getCurrentUser from "./actions/getCurrentUser";
import getUsedItems from "./actions/getUsedItems";
import Container from "./components/Container";
import NoItems from "./components/NoItems";
import Categories from "./components/category/Categories";
import Header from "./components/header/Header";
import UsedItemCard from "./components/usedItem/UsedItemCard";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};
export default async function Home({ searchParams }: Props) {
  const currentUser = await getCurrentUser();
  const usedItems = await getUsedItems(searchParams["category"]);
  return (
    <>
      <Header />
      <Container>
        <Categories />
        {usedItems && usedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-10">
            {usedItems.map((item) => (
              <UsedItemCard
                key={item.title}
                data={item}
                currentUser={currentUser}
              />
            ))}
          </div>
        ) : (
          <NoItems center />
        )}
      </Container>
    </>
  );
}
