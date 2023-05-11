import useComment from "@/app/hooks/useComment";
import { Comment, User } from "@prisma/client";
import { useAnimationControls, motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import TimeAgo from "react-timeago";
import CommentTextarea from "./CommentTextarea";
import TextButton from "../button/TextButton";

type Props = {
  user: User;
  comment: Comment;
  currentUser?: User | null;
  deleteComment: (commentId: string) => void;
  updateComment: (ommentId: string, content: string) => void;
};

const UserComment = ({
  user,
  comment,
  currentUser,
  updateComment,
  deleteComment,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const wholeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wholeRef, { once: true });
  const controls = useAnimationControls();
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isInView) {
      controls.start("start");
    }
  }, [isInView, controls]);
  const longComment = useMemo(() => {
    const limit = 200;
    if (isMore) return false;
    if (comment.content.length > limit) {
      return `${comment.content.slice(0, limit)}...`;
    } else return false;
  }, [comment, isMore]);

  const variants = {
    initial: {
      opacity: 0,
      x: 200,
    },
    start: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <motion.div
      className="flex gap-3"
      variants={variants}
      initial="initial"
      animate={controls}
      transition={{
        duration: 0.8,
        tyep: "spring",
      }}
      ref={wholeRef}
    >
      <div className="w-7 min-w-[1.75rem] h-7 rounded-full overflow-hidden">
        {user.image ? (
          <Image
            src={user.image as string}
            width={80}
            height={80}
            alt={user.name as string}
            className="w-full h-full"
          />
        ) : (
          <AiOutlineUser className="w-full h-full" />
        )}
      </div>
      <div className="w-full">
        <TimeAgo
          date={comment.createdAt}
          className="text-xs text-neutral-400"
          live={false}
        />
        {isEdit ? (
          <CommentTextarea textref={ref} />
        ) : (
          <p className="font-thin text-sm">
            <strong className="pr-2 text-base font-bold">
              {user.name || "unknown"}
            </strong>
            {longComment ? longComment : comment.content}
            {longComment && (
              // <div className="flex justify-end">
              <TextButton
                marginL
                label="more"
                onClick={() => {
                  setIsMore(true);
                }}
              />
              // </div>
            )}
            {isMore && (
              <TextButton
                marginL
                label="...short"
                onClick={() => {
                  setIsMore(false);
                }}
              />
            )}
          </p>
        )}

        {currentUser?.email === user.email ? (
          <div className="flex gap-2 mt-2">
            <TextButton
              label="remove"
              onClick={() => deleteComment(comment.id)}
            />
            {!isEdit ? (
              <TextButton
                label="edit"
                onClick={() => {
                  setIsEdit(true);
                }}
              />
            ) : (
              <>
                <TextButton
                  label="cancel"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                />
                <TextButton
                  label="done"
                  onClick={() => {
                    if (!ref || !ref.current || !ref.current.value) return;
                    setIsEdit(false);
                    updateComment(comment.id, ref.current.value);
                  }}
                />
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
};

export default UserComment;
