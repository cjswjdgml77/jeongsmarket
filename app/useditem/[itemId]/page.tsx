import getCurrentUser from "@/app/actions/getCurrentUser";
import { getUsedItem } from "@/app/actions/getUsedItems";
import AnimatePage from "@/app/components/AnimatePage";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import CommentContainer from "@/app/components/Input/CommentContainer";
import CommentCount from "@/app/components/button/CommentCount";
import HeartCount from "@/app/components/button/HeartCount";
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
          pb-10
          "
      >
        <ImagesSlider images={usedItemDetail.images} />
        <User
          user={usedItemDetail.user}
          address={usedItemDetail.address}
          createdAt={usedItemDetail.createdAt}
        />
        <hr />
        <Heading title={usedItemDetail.title} />
        <div className="font-bold text-xl">${usedItemDetail.price}</div>
        <TextArea description={usedItemDetail.description} />
        <hr />
        <div className="flex items-center gap-3">
          <HeartCount
            count={usedItemDetail.favorites}
            currentUser={currentUser}
            usedItemId={usedItemDetail.id}
            big
          />
          <CommentCount
            comments={usedItemDetail.comments}
            usedItemId={usedItemDetail.id}
            big
          />
        </div>
        <CommentContainer
          usedItemId={usedItemDetail.id}
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
};

export default page;
