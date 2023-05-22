import { useState, useEffect, useContext } from "react";
import Modal from "@/components/Modal/Modal";
import DetailItem from "@/components/Detail/DetailItem";
import styles from "./AddBottle.module.css";
import { BeerItem } from "@/types";

import BeerCollectionContext from "@/store/store";
import ModalContext from "@/store/modalStore";

export default function AddBottle(props: { title: string }) {
  const [name, setName] = useState<string>("");
  const [results, setResults] = useState<BeerItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<BeerItem>();
  const ctx = useContext(BeerCollectionContext);
  const modalCtx = useContext(ModalContext);

  useEffect(() => {
    if (name.length > 0) {
      //look for bottle in api register
      fetch(`https://api.punkapi.com/v2/beers?beer_name=${name}`)
        .then((response) => response.json())
        .then((data: BeerItem[]) => setResults([...data]));
    } else setResults([]);
  }, [name]);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const addBottle = () => {
    if (selectedItem === undefined)
      return;

    if (
      ctx.defaultData.filter((i) => i.name === selectedItem!.name).length > 0 ||
      ctx.filteredBeerCollection.filter((i) => i.name === selectedItem!.name)
        .length > 0
    ) {
      alert(
        "This is already in your collection - choose another bottle to add"
      );
      return;
    }
    
    ctx.setDefaultData( (prevState: BeerItem[]) => [...prevState, selectedItem] );
    
    ctx.setFilteredBeerCollection((prevState: BeerItem[]) => [selectedItem, ...prevState]);
    
    ctx.setTriggerSorting((prevState: boolean) => !prevState);
    modalCtx.setIsModalOpen(false);
  };

  const openSelected = (result: BeerItem) => {
    setSelectedItem(result);
    modalCtx.setIsModalOpen(true);
  };

  const backToSearch = () => {
    setSelectedItem(undefined);
  };

  return (
    <article className={styles.wrapper}>
      <h2>{props.title}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={updateName} />
      </form>
      <div className={styles.results}>
        <h4>Results</h4>
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul className={styles.resultList}>
            {results.map((result) => (
              <button
                className={styles.resultItem}
                onClick={() => openSelected(result)}
                key={result.id}
              >
                {result.name} {ctx.defaultData.filter((i) => i.name === result.name).length > 0 ?  <span className={styles.gotItSpan}>In your collection</span> : null}
              </button>
            ))}
          </ul>
        )}
        {modalCtx.isModalOpen && selectedItem ? (
          <Modal closeButton={false}>
            <div className="modal-button-wrapper">
              <button
                className="green-button button close-modal"
                onClick={backToSearch}
              >
                x
              </button>
            </div>
            
            {ctx.defaultData.filter((i) => i.name === selectedItem!.name)
              .length > 0 ||
            ctx.filteredBeerCollection.filter(
              (i) => i.name === selectedItem!.name
            ).length > 0 ? (
              <div className={styles.gotIt}>In your collection</div>
            ) : (
              null
            )}
            <DetailItem {...selectedItem}></DetailItem>{" "}
            <button
              className={`green-button button ${styles.addButton}`}
              onClick={addBottle}
            >
              Add to Collection
            </button>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}
