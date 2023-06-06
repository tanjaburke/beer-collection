import { ReactNode } from "react";

import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero(props: { url: string; children?: ReactNode }) {
  return (
    <section
    className={`hero ${styles.hero}`}
  >
    <Image src={props.url} fill={true} alt=""/>
    {props.children}
  </section>
  );
}
