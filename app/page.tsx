import getCurrentUser from "./actions/getCurrentUser";
import Header from "./components/header/Header";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Header />
    </div>
  );
}
