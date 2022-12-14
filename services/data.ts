import { Property } from "csstype";
import Color = Property.Color;

export enum Endorsement {
  GREEN = "green",
  GREY = "grey",
  RED = "red",
  YELLOW = "yellow",
}

export interface ArticleData {
  id: number;
  post_id: number;
  url: string;
  post_title: string;
  post_subtitle: string;
  type: string;
  source: string;
  subject: string;
  list: string;
  subject_id: number | "";
  list_id: number | "";
}

export interface CategoryData {
  id: number;
  description?: string;
  name?: string;
  description_en: string;
  description_it: string;
  name_en: string;
  name_it: string;
  source: "EUROSTAT" | "indecis.it";
  slug: string;
}

export interface EndorsementData {
  id: number;
  color_code: Color;
  description: string;
  icon: Endorsement;
}

export interface ItemData {
  id: number;
  category_id: number;
  category: string;
  description: string;
  endorsement: string;
  subject: string;
  subject_slug: string;
  list: string;
  list_id?: number | string;
  source_slug: string;
  source_title: string;
}

export interface ListData {
  id: number;
  list: string;
  slug: string;
  symbol_name: string;
  symbol_url: string;
}

export interface SourceData {
  id: number;
  list: string;
  slug: string;
  title: string;
  type:
    | "accordo elettorale"
    | "campagna elettorale"
    | "conferenza stampa"
    | "programma"
    | "tweet";
  url: string;
}

export interface SubjectData {
  id: number;
  description: string;
  slug: string;
  source?: string;
  subject: string;
  title?: string;
  url: string;
}

const getArticlesData = (): Promise<ArticleData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/press.json"
  ).then((response) => response.json());

const getCategoriesData = (): Promise<CategoryData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/categories.json"
  ).then((response) => response.json());

const getEndorsementsData = (): Promise<EndorsementData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/endorsements.json"
  ).then((response) => response.json());

const getItemsData = (): Promise<ItemData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/items.json"
  ).then((response) => response.json());

const getListsData = (): Promise<ListData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/lists.json"
  ).then((response) => response.json());

const getSourcesData = (): Promise<SourceData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/sources.json"
  ).then((response) => response.json());

const getSubjectsData = (): Promise<SubjectData[]> =>
  fetch(
    "https://raw.githubusercontent.com/indecis-it/data/main/data/glossary.json"
  ).then((response) => response.json());

export const dataService = {
  getArticlesData,
  getCategoriesData,
  getEndorsementsData,
  getListsData,
  getItemsData,
  getSourcesData,
  getSubjectsData,
};
