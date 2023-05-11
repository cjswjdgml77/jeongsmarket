"use client";
import { User } from "@prisma/client";
import Button from "../button/Button";
import UserComment from "./UserComment";
import useComment from "@/app/hooks/useComment";
import { use, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentTextarea from "./CommentTextarea";

type Props = {
  usedItemId: string;
  currentUser?: User | null;
};

const CommentContainer = ({ usedItemId, currentUser }: Props) => {
  const {
    addComment,
    take,
    disabled,
    getComments,
    comments,
    deleteComment,
    updateComment,
  } = useComment();
  useEffect(() => {
    getComments(usedItemId);
  }, []);
  useEffect(() => {
    const scroll = () => {
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      if (bodyHeight === windowHeight + scrollY) {
        getComments(usedItemId);
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [take, comments]);
  const ref = useRef<HTMLTextAreaElement>(null);
  if (!comments) return <div></div>;
  return (
    <div className="overflow-hidden">
      <div className="flex items-center gap-2">
        <div>Comments</div>
        <div className="text-neutral-500 text-xs">{`(${comments.length})`}</div>
      </div>
      <CommentTextarea textref={ref} disabled={disabled} />
      <div className="w-1/2 sm:w-1/4">
        <Button
          label="Post comment"
          outline
          onClick={async () => {
            if (!ref || !ref.current) return;
            await addComment(usedItemId, ref.current.value);
            ref.current.value = "";
          }}
        />
      </div>
      <div className="flex flex-col mt-5 gap-5">
        <AnimatePresence initial={false}>
          {comments.length === 0 ? (
            <div className="text-center text-neutral-500">
              Make a first comment!
            </div>
          ) : (
            comments.map((comment, idx) => (
              <motion.div
                layout
                key={comment.id}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <UserComment
                  user={comment.user}
                  comment={comment}
                  currentUser={currentUser}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommentContainer;
