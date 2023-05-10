import getCurrentUser from "@/app/actions/getCurrentUser";
import { getUsedItem } from "@/app/actions/getUsedItems";
import AnimatePage from "@/app/components/AnimatePage";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import HeartCount from "@/app/components/usedItem/HeartCount";
import ImagesSlider from "@/app/components/usedItem/ImagesSlider";
import TextArea from "@/app/components/usedItem/TextArea";
import User from "@/app/components/usedItem/User";
type Props = {
  params: {
    itemId: string;
  };
};

const page = async ({ params }: Props) => {
  const usedItemDetail = await getUsedItem(params.itemId);
  const currentUser = await getCurrentUser();
  if (!usedItemDetail) return null;
  return (
    <Container>
      <div
        className="
          sm:w-3/4
          lg:w-1/2
          flex
          flex-col
          m-auto
          inset-0
            gap-4
          "
      >
        <ImagesSlider images={usedItemDetail.images} />
        <User user={usedItemDetail.user} address={usedItemDetail.address} />
        <hr />
        <Heading title={usedItemDetail.title} />
        <div className="font-bold text-xl">${usedItemDetail.price}</div>
        <TextArea description={usedItemDetail.description} />
        <hr />
        <div>
          <HeartCount
            count={usedItemDetail.favorites}
            currentUser={currentUser}
            usedItemId={usedItemDetail.id}
            big
          />
        </div>
      </div>
    </Container>
  );
};

export default page;
