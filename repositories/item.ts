import {
  CategoryData,
  dataService,
  Endorsement,
  ItemData,
  ListData,
  SourceData,
} from "../services/data";
import { EndorsementModel } from "../models/endorsements";
import { ListModel } from "../models/lists";
import { CategoryModel } from "../models/categories";

export interface Item extends Omit<Omit<ItemData, "endorsement">, "source"> {
  category_slug: CategoryData["slug"];
  empty: boolean;
  endorsement: EndorsementSimple;
  source: SourceSimple;
  uid: string | -1;
}

export interface EndorsementSimple {
  description: string;
  icon: Endorsement;
}

export interface SourceSimple {
  content: string;
  title: string;
  url: string;
}

export type Items = Record<ItemData["subject_slug"], Item[]>;

const byListId = (a: ItemData, b: ItemData) =>
  (a.list_id as number) - (b.list_id as number);

const isValidItem =
  (id: CategoryData["id"]) =>
  ({ list_id, category_id, subject_slug }: ItemData) =>
    category_id === id && list_id && subject_slug;

const getDefaultItems = (
  lists: ListData[],
  subject_slug: Item["subject_slug"]
): Partial<Item>[] =>
  lists.map(({ id }) => ({
    list_id: id,
    subject_slug,
    empty: true,
  }));

const getSource = (itemData: ItemData, sources: SourceData[]): SourceSimple => {
  const { url = "", title = "" } =
    sources.find((sourceData) =>
      itemData.source_slug.includes(sourceData.slug)
    ) || {};
  return {
    content:
      itemData.description ||
      "Il tema non è presente nelle fonti a nostra disposizione.",
    title,
    url,
  };
};

export const ItemRepository = (service: typeof dataService = dataService) => {
  const categoryModel = CategoryModel(service);
  const endorsementModel = EndorsementModel(service);
  const listModel = ListModel(service);

  const prepareItems = async (itemsData: ItemData[]) => {
    const categories = await categoryModel.getCategories();
    const endorsements = await endorsementModel.getEndorsements();
    const lists = await listModel.getLists();
    const sources = await service.getSourcesData();
    return itemsData.reduce((acc: Items, itemData) => {
      const { subject_slug } = itemData;
      const current = acc[subject_slug] || getDefaultItems(lists, subject_slug);
      const endorsement = endorsementModel.getEndorsement(
        itemData,
        endorsements
      );
      const source = getSource(itemData, sources);
      const listPosition = (itemData.list_id as number) - 1;
      current[listPosition] = {
        ...itemData,
        category_slug:
          categories.find((cat) => cat.id === itemData.category_id)?.slug || "",
        empty: false,
        uid: `${subject_slug}-${itemData.list_id}`,
        endorsement,
        source,
      };
      return { ...acc, [subject_slug]: current };
    }, {});
  };

  const getItems = async (id: ItemData["category_id"]): Promise<Items> => {
    if (!id) {
      return {};
    }
    const itemsData = (await service.getItemsData())
      .filter(isValidItem(id))
      .sort(byListId);
    return prepareItems(itemsData);
  };

  const getItemsBySubjectSlug = async (
    subject_slug: ItemData["subject_slug"]
  ): Promise<Item[]> => {
    if (!subject_slug) {
      return [];
    }
    const itemsData = (await service.getItemsData())
      .filter((item) => item.subject_slug === subject_slug)
      .sort(byListId);
    return (await prepareItems(itemsData))[subject_slug];
  };

  return {
    getItems,
    getItemsBySubjectSlug,
  };
};
