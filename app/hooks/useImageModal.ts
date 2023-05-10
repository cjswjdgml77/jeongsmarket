import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  secure_url?: string | undefined;
  layoutkey?: string | undefined;
};
const useImageModal = ({ secure_url, layoutkey }: Props) => {
  const imageModal = atom({
    key: "imageModal",
    default: false,
  });
  const setImageModal = useSetRecoilState(imageModal);
  const isOpen = useRecoilValue(imageModal);
  const onOpen = () => {
    setImageModal(true);
  };
  const onClose = () => {
    setImageModal(false);
  };
  return { secure_url, layoutkey, isOpen, onOpen, onClose };
};

export default useImageModal;
