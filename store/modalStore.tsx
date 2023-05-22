import { useState, createContext } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: any;
};

const ModalDefaultValue: ModalContextType = {
  isModalOpen: false,
  setIsModalOpen: () => {},
};

const ModalContext = createContext<ModalContextType>(ModalDefaultValue);

export const ModalContextProvider = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <ModalContext.Provider
      value={{
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
