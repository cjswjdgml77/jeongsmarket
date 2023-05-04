import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const useRegisterModal = () => {
  const registerModal = atom({
    key: "registerModal",
    default: false,
  });
  const setRegisterModal = useSetRecoilState(registerModal);
  const isOpen = useRecoilValue(registerModal);

  const onOpen = () => {
    setRegisterModal(true);
  };
  const onClose = () => {
    setRegisterModal(false);
  };

  return { isOpen, onOpen, onClose };
};

export default useRegisterModal;
