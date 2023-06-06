import {
  useState,
  createContext,
  useEffect,
  useReducer,
  Dispatch,
  SetStateAction,
} from "react";
import { BeerItem, SelectedValues, FilterAction } from "@/types";
import filterBeers from "./filter";
import filterParamsReducer from "./reducer";

type BeerCollectionContextType = {
  filteredBeerCollection: BeerItem[];
  setFilteredBeerCollection: Dispatch<SetStateAction<BeerItem[]>>;
  dispatch: Dispatch<FilterAction>;
  isFiltered: boolean;
  setSortParameter: (param: string) => void;
  sortParameter: string;
  setDefaultData: Dispatch<SetStateAction<BeerItem[]>>;
  defaultData: BeerItem[];
  triggerSorting: boolean;
  setTriggerSorting: Dispatch<SetStateAction<boolean>>;
};

const BeerCollectionDefaultValue: BeerCollectionContextType = {
  filteredBeerCollection: [],
  setFilteredBeerCollection: () => {},
  dispatch: (_) => {},
  isFiltered: false,
  setSortParameter: () => {},
  sortParameter: "id", // Default sort parameter
  setDefaultData: (_) => {},
  defaultData: [],
  triggerSorting: false,
  setTriggerSorting: () => {},
};

const BeerCollectionContext = createContext<BeerCollectionContextType>(
  BeerCollectionDefaultValue
);

export const BeerCollectionContextProvider = (props: any) => {
  const [defaultData, setDefaultData] = useState<BeerItem[]>([]);
  const [triggerSorting, setTriggerSorting] = useState<boolean>(false);
  const [filteredBeerCollection, setFilteredBeerCollection] = useState<
    BeerItem[]
  >([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const initialState: SelectedValues = {
    selectedYears: [],
    name: "",
    selectedTypes: [],
  };
  const [sortParameter, setSortParameter] = useState<string>("");
  const [state, dispatch] = useReducer(filterParamsReducer, initialState);

  useEffect(() => {
    //Check if data is available. Return if not.
    if (defaultData.length === 0) return;

    //get filtered Data
    const filteredData = filterBeers(state, defaultData);

    //check if base case
    if (filteredData === defaultData && sortParameter === "") {
      //tell application to use defaultData
      setIsFiltered(false);
      return;
    }

    const data =
      sortParameter !== "" ? filteredData.sort(sortMyArray) : filteredData;
    setFilteredBeerCollection([...data]);
    //tell application to use filteredData
    setIsFiltered(true);
  }, [state, sortParameter, triggerSorting]);

  const sortMyArray = (a: BeerItem, b: BeerItem) => {
    const sortParam = sortParameter as keyof BeerItem;

    let first = a[sortParam];
    let second = b[sortParam];

    if (sortParam === "first_brewed") {
      first = makeDateStringComparable(first as string);
      second = makeDateStringComparable(second as string);
    }

    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  };

  const makeDateStringComparable = (dateString: string): number => {
    const year = dateString.split("/")[1];
    return Number.parseInt(year);
  };

  return (
    <BeerCollectionContext.Provider
      value={{
        setFilteredBeerCollection: setFilteredBeerCollection,
        dispatch: dispatch,
        isFiltered: isFiltered,
        filteredBeerCollection: filteredBeerCollection,
        sortParameter: sortParameter,
        setSortParameter: setSortParameter,
        setDefaultData: setDefaultData,
        defaultData: defaultData,
        triggerSorting: triggerSorting,
        setTriggerSorting: setTriggerSorting,
      }}
    >
      {props.children}
    </BeerCollectionContext.Provider>
  );
};

export default BeerCollectionContext;
