import styles from "./DetailItem.module.css";

import { BeerItem, ContentSubType } from "@/types";

function DetailItem(props: BeerItem) {
  const { ingredients } = props;
  
  const drawYeastComponent = (name: string) => <p>Yeast: {name}</p>;

  const drawListComponents = (
    ingredientName: string,
    contents: ContentSubType[]
  ) => (
    <>
      <p>{ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)}</p>
      <ul>
        {contents.map((content, index) => (
          <li key={index}>{content.name}</li>
        ))}
      </ul>
    </>
  );

  return (
    <li className={`${styles.detailItem} content-box detail-item`}>
      <div className={`text-wrapper ${styles.textWrapper}`}>
        <h1 className={`title ${styles.title}`}>{props.name}</h1>
        <p className={`tagline ${styles.tagline}`}>{props.tagline}</p>
        <p className={`detail-item-text ${styles.text}`}>
          <span style={{ fontFamily: "Impact" }}>First Brewed: </span>
          {props.first_brewed}
        </p>
        <p className={`detail-item-text ${styles.text}`}>
          <span style={{ fontFamily: "Impact" }}>Description: </span>
          {props.description}
        </p>
        <p className={`detail-item-text ${styles.text}`}>
          <span style={{ fontFamily: "Impact" }}>Ingredients: </span>{" "}
        </p>

        {Object.entries(ingredients).map(([key, value]) => {
          return key.toLowerCase() === "yeast"
            ? drawYeastComponent(value as string)
            : drawListComponents(key, value as ContentSubType[]);
        })}
      </div>
      <div className={`detail-item-image-wrapper ${styles.imageWrapper}`}>
        <img
          className={`detail-item-image ${styles.image}`}
          src={props.image_url}
          alt={`picture of${props.name}`}
        />
      </div>
    </li>
  );
}

export default DetailItem;
