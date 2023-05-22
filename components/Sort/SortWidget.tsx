import {useContext} from "react";

import BeerCollectionContext from "@/store/store";
import styles from './SortWidget.module.css'

export default function SortWidget(props: {
  sortingOptions: string[];
  dataToBeSorted: any;
}) {
  let sortParameter = ''
  const ctx = useContext(BeerCollectionContext)

  const  sortEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sortParameter = event.target.value;
    ctx.setSortParameter(sortParameter);
  }

  return (
    <>
      <select className={`button green-button ${styles.widget}`} id="sorting" name="sorting" onChange={sortEventHandler}>
      <option value="sort By" selected disabled hidden>Sort by</option>
        {props.sortingOptions.map((value, i) => {
          return (
            <option key={`sorting_option_${i}`} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </>
  );
}
