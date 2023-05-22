import { useState, useEffect, useContext } from "react";

import Input from "../UI/Input";
import FilterItem from "./FilterItem";
import styles from "./Filter.module.css";
import BeerCollectionContext from "@/store/store";
import InputContext from "@/store/inputStore";

import { FilterAction } from "@/types";


type FilterObj = {
  category: string;
  value: string;
  items?: string[]
};

type FilterProps = {
  onClose: () => void;
};

export default function Filter(props: FilterProps) {
  const ctx = useContext(BeerCollectionContext);
  const inputCtx = useContext(InputContext)
  const [years, setYears] = useState<string[]>([]);
  const beerTypes: string[] = ["IPA", "pilsner", "Lager"];
  const [selectedFilter, setSelectedFilter] = useState<FilterObj>({
    category: "Year",
    value: "years",
    items: years,
  });
  const filters: FilterObj[] = [
    { category: "Year", value: "years", items: years },
    { category: "Type", value: "types", items: beerTypes },
    { category: "Name", value: "name" },
  ];

  useEffect(() => {
    setYears([]);
    for (let i = 2007; i < 2021; i++) {
      setYears((prevState) => [...prevState, i.toString()]);
    }
  }, []);

  const handleCategoryClick = (filter: FilterObj) => {
    setSelectedFilter(filter);
  };

  const clearFilters = (dataObj: any) => {
    ctx.dispatch(dataObj);
    inputCtx.setCheckedInputBoxes([])
    inputCtx.setNameField('')
  };

  const closeFilter = () => {
    props.onClose();
  }

  const handleNameChange = (dataObj: FilterAction, name: string) =>{
    ctx.dispatch(dataObj)
    inputCtx.setNameField(name)
  }
  const drawFilterData = () => {
    if (selectedFilter.value === "years") {
      return (
        <FilterItem title="Year">
          {years.map((year) => {
            return (
              <>
                <div className={styles.filterItem} key={`year-${year}`}>
                  <Input
                    classes={styles.filterCheckbox}
                    type="checkbox"
                    id={`year_${year}`}
                    label={year}
                    onChange={() => ctx.dispatch({type: "SELECT_YEAR", payload: year})}
                  />
                </div>
              </>
            );
          })}
        </FilterItem>
      );
    } else if (selectedFilter.value === "types") {
      return (
        <FilterItem title="Type">
          {beerTypes.map((type) => {
            return (
              <>
                <div className={styles.filterItem} key={`type-${type}`}>
                  <Input
                    classes={styles.filterCheckbox}
                    type="checkbox"
                    id={`type_${type}`}
                    label={type}
                    onChange={() => ctx.dispatch({type: "SELECT_TYPE", payload: type})}
                  ></Input>
                </div>
              </>
            );
          })}
        </FilterItem>
      );
    } else {
      return (
        <FilterItem title="Name">
          <label className={styles.filterOptions} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={inputCtx.nameField}
            onChange={(event) =>
              handleNameChange({ type: "SELECT_NAME", payload: event.target.value }, event.target.value)}
          />
        </FilterItem>
      );
    }
  };

  return (
<section className={styles.overlay} onClick={closeFilter}>
      <article
        className={styles.filter}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.column} ${styles.leftColumn}`}>
          <h2 className={styles.filterTitle}>Filter</h2>
          {filters.map((filter, index) => (
            <button
              className={`${styles.filterButton} ${
                selectedFilter.category === filter.category
                  ? styles.selected
                  : ""
              }`}
              key={`filter-${index}`}
              onClick={() => handleCategoryClick(filter)}
            >
              {filter.category}
            </button>
          ))}
        </div>
        <form
          onSubmit={e => { e.preventDefault(); }}
          className={`${styles.column} ${styles.rightColumn}`}
        >
          {drawFilterData()}
          <button className="button white-button" style={{marginTop: '35px'}} onClick={()=>{clearFilters({ type: "CLEAR_FILTER", payload: undefined})}}>Clear Filter</button>
        </form>
        <button className={styles.icon} onClick={closeFilter}>
          X
        </button>
      </article>
    </section>
  );
}
