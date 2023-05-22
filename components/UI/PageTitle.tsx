import React from "react";

import styles from "./PageTitle.module.css";

export default function PageTitle(props: {
  wordSplit: boolean;
  title: string;
  subTitle?: string;
}) {
  
  const words = props.title?.split(" ");

  return (
    <article className={styles.titleWrapper}>
      {props.wordSplit ? (
        <h1 className={styles.title}>
          {words!.map((word, i) => {
            return <span key={i}>{word}</span>;
          })}
        </h1>
      ) : <h1 className={styles.title}>{props.title}</h1>}

      <p className={styles.subTitle}>{props.subTitle}</p>
    </article>
  );
}
