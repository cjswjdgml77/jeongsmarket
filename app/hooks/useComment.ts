import { Comment, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useComment() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [take, setTake] = useState(10);
  const [comments, setComments] = useState<(Comment & { user: User })[]>([]);

  console.log(take);
  const addComment = async (usedItemId: string, content: string) => {
    if (!content) return;
    setDisabled(true);
    try {
      const response = await axios.post(`${location.origin}/api/comment`, {
        usedItemId,
        content,
      });
      // const data = [...comments, response.data];
      setComments([...comments, response.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setDisabled(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!commentId) return;
    try {
      const response = await axios.delete(
        `${location.origin}/api/comment/${commentId}`
      );
      setComments(comments?.filter((comment) => comment.id !== commentId));
    } catch (e) {}
  };

  const getComments = async (usedItemId: string) => {
    if (take === 0) return;
    console.log("execute");
    const response = await axios.get(
      `${location.origin}/api/comment/${usedItemId}/${take}`
    );
    if (response.data.length === take) {
      setTake(take + 10);
    } else setTake(0);
    setComments(response.data);
  };

  const updateComment = async (commentId: string, content: string) => {
    if (!commentId) return;
    try {
      const fixed = comments?.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content,
          };
        }
        return comment;
      });
      const response = await axios.put(`${location.origin}/api/comment`, {
        commentId,
        content,
      });
      setComments(fixed);
    } catch (e) {}
  };
  return {
    addComment,
    disabled,
    deleteComment,
    getComments,
    comments,
    updateComment,
    take,
  };
}
