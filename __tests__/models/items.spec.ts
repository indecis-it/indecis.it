import { ItemRepository } from "../../repositories/item";
import { itemsData } from "../fixtures/items";
import { sourcesData } from "../fixtures/sources";
import { endorsementsData } from "../fixtures/endorsements";
import { categoriesData } from "../fixtures/categories";
import { dataService } from "../../services/data";
import { listsData } from "../fixtures/lists";

const mockedDtaService: typeof dataService = {
  getCategoriesData: () => Promise.resolve(categoriesData),
  getEndorsementsData: () => Promise.resolve(endorsementsData),
  getItemsData: () => Promise.resolve(itemsData),
  getListsData: () => Promise.resolve(listsData),
  getSourcesData: () => Promise.resolve(sourcesData),
};

const itemModel = ItemRepository(mockedDtaService);

describe("Items", () => {
  it("has the correct order", () => {
    expect(itemModel.getItems(4)).toBe([]);
  });
});
