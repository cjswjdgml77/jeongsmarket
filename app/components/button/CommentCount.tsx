import { Comment } from "@prisma/client";
import { BsChat } from "react-icons/bs";

type Props = {
  usedItemId: string;
  comments: Comment[];
  big?: boolean;
};

const CommentCount = ({ usedItemId, comments, big }: Props) => {
  return (
    <div className={`flex items-center gap-1 ${big && "gap-2 text-xl"}`}>
      <BsChat />
      <div className="font-thin text-neutral-500">{comments.length}</div>
    </div>
  );
};

export default CommentCount;
