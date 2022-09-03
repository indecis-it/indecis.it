import { dataService } from "../../services/data";
import { categoriesData } from "../fixtures/categories";
import { endorsementsData } from "../fixtures/endorsements";
import { itemsData } from "../fixtures/items";
import { listsData } from "../fixtures/lists";
import { sourcesData } from "../fixtures/sources";

export const mockedDtaService: typeof dataService = {
  getCategoriesData: () => Promise.resolve(categoriesData),
  getEndorsementsData: () => Promise.resolve(endorsementsData),
  getItemsData: () => Promise.resolve(itemsData),
  getListsData: () => Promise.resolve(listsData),
  getSourcesData: () => Promise.resolve(sourcesData),
};
