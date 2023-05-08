import { getUsedItem } from "@/app/actions/getUsedItems";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import React from "react";

type Props = {
  params: {
    itemId: string;
  };
};

const page = async ({ params }: Props) => {
  const usedItemDetail = await getUsedItem(params.itemId);
  if (!usedItemDetail) return null;
  return (
    <div className="mt-14">
      <Container>
        <Heading title={usedItemDetail.title} />
      </Container>
    </div>
  );
};

export default page;
