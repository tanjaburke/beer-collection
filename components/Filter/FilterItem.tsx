import { ReactNode } from "react";
import styles from "./FilterItem.module.css";

export default function FilterItem(props: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.filterGroup}>
      <h3 className={styles.filterTitle}>By {props.title}</h3>
      {props.children}
    </div>
  );
}
