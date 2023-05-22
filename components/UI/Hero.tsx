import { ReactNode } from "react";

import styles from "./Hero.module.css";

export default function Hero(props: { url: string; children?: ReactNode }) {
  return (
    <section
      style={{ backgroundImage: `url("${props.url}")` }}
      className={styles.hero}
    >
      {props.children}
    </section>
  );
}
