import { useState, createContext, Dispatch, SetStateAction } from "react";

type InputContextType = {
  nameField: string;
  setNameField: Dispatch<SetStateAction<string>>;
  checkedInputBoxes: string[];
  setCheckedInputBoxes: Dispatch<SetStateAction<string[]>>;
  handleFilterInput: (id: string) => void;
};

const InputDefaultValue: InputContextType = {
  nameField: "string",
  setNameField: () => {},
  checkedInputBoxes: [],
  setCheckedInputBoxes: () => {},
  handleFilterInput: () => {},
};

const InputContext = createContext<InputContextType>(InputDefaultValue);

export const InputContextProvider = (props: any) => {
  const [checkedInputBoxes, setCheckedInputBoxes] = useState<string[]>([]);
  const [nameField, setNameField] = useState<string>("");

  const handleFilterInput = (id: string) => {
    if (checkedInputBoxes.includes(id)) {
      setCheckedInputBoxes(checkedInputBoxes.filter((e) => e !== id));
    } else {
      setCheckedInputBoxes((prevState) => [...prevState, id]);
    }
  };

  return (
    <InputContext.Provider
      value={{
        checkedInputBoxes: checkedInputBoxes,
        setCheckedInputBoxes: setCheckedInputBoxes,
        nameField: nameField,
        setNameField: setNameField,
        handleFilterInput: handleFilterInput
      }}
    >
      {props.children}
    </InputContext.Provider>
  );
};

export default InputContext;
