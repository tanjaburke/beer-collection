import { useState, useEffect, useContext } from "react";

import ModalContext from "@/store/modalStore";

export default function useBodyScrollLock() {
  const [bodyStyle, setBodyStyle] = useState<CSSStyleDeclaration>();
  const [isLocked, setIsLocked] = useState<boolean>();

  const modalCtx = useContext(ModalContext);
  useEffect(() => {
    if (bodyStyle) {
      bodyStyle.overflowY = modalCtx.isModalOpen ? "hidden" : "auto";
    }
  }, [modalCtx.isModalOpen, bodyStyle]);

  useEffect(() => {
    setBodyStyle(document.body.style);
    bodyStyle ? setIsLocked(bodyStyle.overflowY === "hidden") : null;
  }, []);

  const toggle = () => {
    setIsLocked(!isLocked);
  };

  return { toggle };
}
