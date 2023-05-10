"use client";
import ListItem from "../components/ListItem";
import { useEffect } from "react";
import axios from "axios";
import useUseritem from "../hooks/useUseritem";
import { CurrentUserFavorites } from "../type";

type Props = {
  currentUser: CurrentUserFavorites;
};

const MyList = ({ currentUser }: Props) => {
  const { mylist, setPagination } = useUseritem();
  useEffect(() => {
    const scroll = () => {
      if (!mylist?.nextSkip) return;
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      if (bodyHeight === windowHeight + scrollY) {
        setPagination((mylist?.usedItems.length as number) + 5);
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [mylist]);
  console.log(mylist);
  return (
    <div className="flex flex-col gap-10 py-5">
      {mylist && mylist.usedItems.length > 0 ? (
        mylist.usedItems.map((item) => (
          <ListItem key={item.id} list={item} currentUser={currentUser} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MyList;
