import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Hero from "@/components/UI/Hero";
import List from "@/components/List/List";
import SortWidget from "@/components/Sort/SortWidget";
import FilterWidget from "@/components/Filter/FilterWidget";
import PageTitle from "@/components/UI/PageTitle";
import Filter from "@/components/Filter/Filter";
import Modal from "@/components/Modal/Modal";
import AddBottle from "@/components/AddBeer/AddBottle";
import Logo from "@/components/Logo/Logo";

import { BeerItem } from "@/types";

import BeerCollectionContext from "@/store/store";
import ModalContext from "@/store/modalStore";

import styles from "./LandingPage.module.css";

import useBodyScrollLock from "@/hooks/bodyScrollLock";
type SortParam = keyof BeerItem;

export default function Home(props: { beers: BeerItem[] }) {
  const ctx = useContext(BeerCollectionContext);
  const modalCtx = useContext(ModalContext);
  const sortingValues: SortParam[] = ["id", "name", "first_brewed"];
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  let rootFilterElement: Element;
  const {toggle} = useBodyScrollLock();

  useEffect(() => {
    ctx.setDefaultData([...props.beers]);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
  }, [modalCtx.isModalOpen]);

  const closeFilter = () => {
    setFilterIsOpen(false);
  };

  const openFilter = () => {
    setFilterIsOpen(true);
  };

  return (
    <main className="main-wrapper">
      <Hero url="/landing-page.jpg">
        <Logo />
        <PageTitle
          wordSplit={false}
          title="MY BEER COLLECTION"
          subTitle={`Your collection counts ${ctx.defaultData.length} bottles`}
        />
      </Hero>

      {isLoaded && filterIsOpen
        ? ReactDOM.createPortal(
            <Filter onClose={closeFilter} />,
            document.getElementById("filter-root")!
          )
        : ""}
      {isLoaded && modalCtx.isModalOpen
        ? ReactDOM.createPortal(
            <Modal closeButton={true}>
              <AddBottle title="Add a new bottle" />
            </Modal>,
            document.getElementById("modal-root")!
          )
        : ""}
      <section className="content-box">
        <div className={styles.widgets}>
          <SortWidget
            dataToBeSorted={
              ctx.isFiltered ? ctx.filteredBeerCollection : props.beers
            }
            sortingOptions={sortingValues}
          />
          <FilterWidget onOpenFilter={openFilter} />
        </div>

        <article>
          <List></List>
        </article>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  //fetch Data from API
  const response = await fetch(
    "https://api.punkapi.com/v2/beers?page=1&per_page=12"
  );
  const data = await response.json();
  return {
    props: {
      beers: data,
    },
  };
}
