import Link from "next/link";
import styles from "./ListItem.module.css";
import { BeerItem } from "@/types";

export default function ListItem(props: { beer: BeerItem }) {
  return (
    <Link
      className={styles.card}
      href={`detail/${props.beer.id}`}
      key={props.beer.id}
    >
      <div className={styles.cardImageWrapper}>
        <img
          className={styles.cardImage}
          src={props.beer.image_url}
          alt={props.beer.name}
        />
      </div>
      <p>
        <span className={styles.title}>{props.beer.name}</span> -{" "}
        {props.beer.tagline}
      </p>
      <div>
        <p className={styles.cardLabel}>First Brewed</p>
        <p className={styles.cardText}>{props.beer.first_brewed}</p>
      </div>
    </Link>
  );
}
