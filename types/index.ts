export type BeerItem = {
  id: number;
  image_url: string;
  name: string;
  description: string;
  tagline: string;
  first_brewed: string;
  ingredients: IngredientsType;
};

export type IngredientsType = {
  hops: ContentSubType[];
  malt: ContentSubType[];
  yeast: string;
};

export type ContentSubType = { name: string; add?: string };

export type SelectedValues = {
  selectedYears: string[];
  name: string;
  selectedTypes: string[];
};

export type FilterAction = {
  type: "SELECT_TYPE" | "SELECT_YEAR" | "SELECT_NAME" | "CLEAR_FILTER" | "undefined";
  payload: string;
};



