import { RecoilEnv, atom, useRecoilValue, useSetRecoilState } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const useLoginModal = () => {
  const loginModal = atom({
    key: "loginModal",
    default: false,
  });
  const setLoginModal = useSetRecoilState(loginModal);
  const isOpen = useRecoilValue(loginModal);
  const onOpen = () => {
    setLoginModal(true);
  };
  const onClose = () => {
    setLoginModal(false);
  };
  return { isOpen, onOpen, onClose };
};
export default useLoginModal;
