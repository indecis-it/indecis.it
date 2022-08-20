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
  describe("with empty list id", () => {
    it("excludes the items", async () => {
      const lists = await mockedDtaService.getListsData();
      const items = await itemModel.getItems(4);
      return expect(items["apprendistato-retribuito"]).toHaveLength(
        lists.length
      );
    });
  });

  it("has the correct order", async () => {
    const items = await itemModel.getItems(4);
    return expect(items["apprendistato-retribuito"]).toMatchObject([
      expect.objectContaining({ list_id: 1 }),
      expect.objectContaining({ list_id: 2 }),
      expect.objectContaining({ list_id: 3 }),
      expect.objectContaining({ list_id: 4 }),
      expect.objectContaining({ list_id: 5 }),
      expect.objectContaining({ list_id: 6 }),
      expect.objectContaining({ list_id: 7 }),
      expect.objectContaining({ list_id: 8 }),
      expect.objectContaining({ list_id: 9 }),
      expect.objectContaining({ list_id: 10 }),
      expect.objectContaining({ list_id: 11 }),
      expect.objectContaining({ list_id: 12 }),
      expect.objectContaining({ list_id: 13 }),
      expect.objectContaining({ list_id: 14 }),
      expect.objectContaining({ list_id: 15 }),
    ]);
  });
});
