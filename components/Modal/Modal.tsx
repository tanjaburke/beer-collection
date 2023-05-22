import { ReactNode, useContext, useEffect } from "react";
import useBodyScrollLock from "@/hooks/bodyScrollLock";

import ModalContext from "@/store/modalStore";
type ModalProps = {
  title?: string;
  children: ReactNode;
  closeButton: boolean;
};

export default function Modal(props: ModalProps) {
  const modalCtx = useContext(ModalContext);

  const closeModal = () => {
    modalCtx.setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {props.closeButton ? (
          <div className="modal-button-wrapper">
            <button className=" button close-modal" onClick={closeModal}>
              x
            </button>
          </div>
        ) : null}
        {props.children}
      </div>
      </div>
    </>
  );
}
