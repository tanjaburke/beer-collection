import Link from "next/link";

import DetailItem from "@/components/Detail/DetailItem";
import { BeerItem } from "@/types";


export default function DetailPage(props: { beer: BeerItem }) {
  return (<>
      <Link className="green-button button modal-button go-back" href="/">&#60; Back</Link>
      <DetailItem {...props.beer} />
      </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://api.punkapi.com/v2/beers");
  const data = await response.json();

  //map over paths to extract id for individual detail pages
  const paths = data.map((beer: BeerItem) => ({
    params: { id: beer.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

type DetailPageParams = {
  id: string;
};

export async function getStaticProps({ params }: { params: DetailPageParams }) {
  //fetch Data from API using params.id
  const response = await fetch(`https://api.punkapi.com/v2/beers/${params.id}`);
  const data = await response.json();

  return {
    props: {
      beer: data[0],
    },
  };
}
