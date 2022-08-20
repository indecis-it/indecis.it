import {
  dataService,
  EndorsementData,
  ItemData,
  SourceData,
} from "../services/data";
import { EndorsementModel } from "../models/endorsements";
import { ListModel } from "../models/lists";

export interface Item extends Omit<Omit<ItemData, "endorsement">, "source"> {
  endorsement: EndorsementSimple;
  source: SourceSimple;
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

const getEndorsement = (
  itemData: ItemData,
  endorsements: EndorsementData[]
): EndorsementSimple => {
  const endorsement = endorsements.find((endorsement) =>
    itemData.endorsement.includes(endorsement.icon)
  );
  return endorsement
    ? {
        description: endorsement.description,
        icon: endorsement.icon,
      }
    : {
        description: "",
        icon: "yellow",
      };
};

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

  const getItems = async (id: ItemData["category_id"]) => {
    if (!id) {
      return {};
    }
    const endorsements = await endorsementModel.getEndorsements();
    const sources = await service.getSourcesData();
    const itemsData = (await service.getItemsData())
      .filter(({ category_id }) => category_id === id)
      .sort((a, b) => (a.list_id as number) - (b.list_id as number));
    return itemsData.reduce((acc: Items, itemData) => {
      const { subject_slug } = itemData;
      const current = acc[subject_slug] || [];
      if (!subject_slug) {
        return acc;
      }
      const endorsement = getEndorsement(itemData, endorsements);
      const source = getSource(itemData, sources);
      return {
        ...acc,
        [subject_slug]: [
          ...current,
          {
            ...itemData,
            endorsement,
            source,
          },
        ],
      };
    }, {});
  };

  return {
    getItems,
    getSubjects,
  };
};
