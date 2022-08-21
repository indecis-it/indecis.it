import {
  CategoryData,
  dataService,
  Endorsement,
  EndorsementData,
  ItemData,
  ListData,
  SourceData,
} from "../services/data";
import { EndorsementModel } from "../models/endorsements";
import { ListModel } from "../models/lists";

export interface Item extends Omit<Omit<ItemData, "endorsement">, "source"> {
  empty: boolean;
  endorsement: EndorsementSimple;
  source: SourceSimple;
  uid: string | -1;
}

export interface EndorsementSimple {
  description: string;
  icon: "green" | "red" | "yellow";
}

export interface SourceSimple {
  content: string;
  title: string;
  url: string;
}

export type Items = Record<ItemData["subject_slug"], Item[]>;
export type Subjects = Record<ItemData["subject_slug"], ItemData["subject"]>;

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
  const endorsementModel = EndorsementModel(service);
  const listModel = ListModel(service);

  const getSubjects = (() => {
    let subjects: Subjects | null = null;
    return async () => {
      if (!subjects) {
        subjects = (await service.getItemsData()).reduce(
          (acc: Subjects, itemData) => {
            const { subject_slug } = itemData;
            const current = acc[subject_slug];
            if (!subject_slug || current) {
              return acc;
            }
            return { ...acc, [subject_slug]: itemData.subject };
          },
          {}
        );
      }
      return subjects;
    };
  })();

  const getItems = async (id: ItemData["category_id"]): Promise<Items> => {
    if (!id) {
      return {};
    }
    const endorsements = await endorsementModel.getEndorsements();
    const lists = await listModel.getLists();
    const sources = await service.getSourcesData();
    const itemsData = (await service.getItemsData())
      .filter(isValidItem(id))
      .sort(byListId);
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
        empty: false,
        uid: `${subject_slug}-${itemData.list_id}`,
        endorsement,
        source,
      };
      return { ...acc, [subject_slug]: current };
    }, {});
  };

  return {
    getItems,
    getSubjects,
  };
};
