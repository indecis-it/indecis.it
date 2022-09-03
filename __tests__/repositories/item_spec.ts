import { ItemRepository } from "../../repositories/item";
import { mockedDtaService } from "../mocks/dataService";

const itemRepository = ItemRepository(mockedDtaService);

describe("Items", () => {
  describe("with empty list id", () => {
    it("excludes the items", async () => {
      const items = await itemRepository.getItems(4);
      return expect(items["apprendistato-retribuito"]).toHaveLength(11);
    });
  });

  it("has the correct order", async () => {
    const items = await itemRepository.getItems(4);
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
    ]);
  });
});
