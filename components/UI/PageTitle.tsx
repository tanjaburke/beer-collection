import React from "react";

import styles from "./PageTitle.module.css";

export default function PageTitle(props: { title: string; color: string }) {
  const words = props.title?.split(" ");

  const getColor = () => {
    if (props.color === "primary") return styles.primary;
    else return styles.white;
  };

  return <h1 className={`${getColor()} ${styles.title}`}>{props.title}</h1>

}
