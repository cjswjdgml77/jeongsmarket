import { Favorite, User } from "@prisma/client";
import axios from "axios";
import useLoginModal from "./useLoginModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useFavorite(
  usedItemPostId: string,
  currentUser?: (User & { favorites: Favorite[] }) | null
) {
  const { onOpen } = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isMyFavorite = () => {
    if (!currentUser) return false;
    return currentUser.favorites.find(
      (favorite) => favorite.usedItemId === usedItemPostId
    );
  };
  const toggleFavorite = async () => {
    const favorite = isMyFavorite();
    if (!currentUser) return onOpen();
    setIsLoading(true);
    try {
      if (!favorite) {
        await axios.post(`${location.origin}/api/favorite/${usedItemPostId}`);
      } else {
        await axios.delete(`${location.origin}/api/favorite/${favorite.id}`);
      }
      router.refresh();
    } catch (error: any) {
      if (error?.response?.statusText) {
        toast.error(error.response.statusText, {
          position: "top-right",
        });
      } else {
        console.log(error);
        toast.error("Internal server error", { position: "top-right" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isMyFavorite, toggleFavorite, isLoading };
}
