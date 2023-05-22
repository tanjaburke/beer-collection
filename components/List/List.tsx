import { useContext, useEffect, useState } from "react";
import { BeerItem } from "@/types";

import styles from "./List.module.css";
import ListItemStyles from "./ListItem.module.css";
import ListItem from "./ListItem";

import BeerCollectionContext from "@/store/store";
import ModalContext from "@/store/modalStore";
import InputContext from "@/store/inputStore";

export default function List() {
  const ctx = useContext(BeerCollectionContext);
  const modalCtx = useContext(ModalContext);
  const inputCtx = useContext(InputContext)
  const [beers, setBeers] = useState<BeerItem[]>([]);
  const { isFiltered, filteredBeerCollection, defaultData } = ctx;

  useEffect(() => {
    setBeers(ctx.isFiltered ? ctx.filteredBeerCollection : ctx.defaultData);
  }, [isFiltered, filteredBeerCollection, defaultData]);

  const openModal = () => {
    modalCtx.setIsModalOpen(true);
  };

  const clearFilters = (dataObj: any) => {
    ctx.dispatch(dataObj);
inputCtx.setCheckedInputBoxes([]);
  inputCtx.setNameField('')
  };

  return (
    <>
      {beers.length > 0 ? (
        <ul className={styles.list}>
          <button
            className={`${ListItemStyles.card} ${ListItemStyles.cardAddNew}`}
            onClick={openModal}
          >
            <div className={ListItemStyles.cardAddNewDottedLine}>
              <span>&#43;</span>
              <p>Add New Bottle</p>
            </div>
          </button>
          {beers.map((beer) => {
            return <ListItem key={beer.id} beer={beer} />;
          })}
        </ul>
      ) : (
        <div>
          <p>No Beer Bottles matches your filters</p>
          <button onClick={()=>{clearFilters({ type: "CLEAR_FILTER", payload: undefined})}}>Clear Filter</button>
        </div>
      )}
    </>
  );
}
