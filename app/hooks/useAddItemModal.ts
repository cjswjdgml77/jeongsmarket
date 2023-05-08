import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export default function useAddItemModal() {
  const addItemModal = atom({
    key: "addItemModal",
    default: false,
  });

  const setAddItemModal = useSetRecoilState(addItemModal);

  const isOpen = useRecoilValue(addItemModal);

  const onOpen = () => {
    setAddItemModal(true);
  };
  const onClose = () => {
    setAddItemModal(false);
  };

  return { isOpen, onOpen, onClose };
}
