import axios from "axios";
import { useEffect, useState } from "react";
import { UserItem } from "../api/useritem/[take]/route";

const useUseritem = () => {
  const [mylist, setMyList] = useState<UserItem>();
  const [pagination, setPagination] = useState<number>(10);

  useEffect(() => {
    const getUserItem = async (pagination: number) => {
      const response = await axios.get(
        `${location.origin}/api/useritem/${pagination}`
      );
      if (response.data) setMyList(response.data);
    };
    getUserItem(pagination);
  }, [pagination]);

  return { mylist, setPagination, pagination };
};

export default useUseritem;
