import {
  Endorsement,
  EndorsementSimple,
  getEndorsements,
} from "./endorsements";
import { getSources, Source, SourceSimple } from "./sources";

export interface ItemData {
  id: number;
  category_id: number;
  category: string;
  description: string;
  endorsement: string;
  subject: string;
  subject_slug: string;
  list: string;
  list_id: number;
  source_slug: string;
  source_title: string;
}

export interface Item extends Omit<Omit<ItemData, "endorsement">, "source"> {
  endorsement: EndorsementSimple;
  source: SourceSimple;
}

export type Items = Record<ItemData["subject_slug"], Item[]>;
export type Topics = Record<ItemData["subject_slug"], ItemData["subject"]>;

const getEndorsement = (
  itemData: ItemData,
  endorsements: Endorsement[]
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

const getSource = (itemData: ItemData, sources: Source[]): SourceSimple => {
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

export const getRawItems = (() => {
  let items: ItemData[] = [];
  return async () => {
    if (!items.length) {
      items = await fetch(
        "https://raw.githubusercontent.com/indecis-it/data/main/data/items.json"
      ).then((response) => response.json());
    }
    return items;
  };
})();

export const getTopics = (() => {
  let names: Topics | null = null;
  return async () => {
    if (!names) {
      names = (await getRawItems()).reduce((acc: Topics, content) => {
        const { subject_slug } = content;
        const current = acc[subject_slug];
        if (!subject_slug || current) {
          return acc;
        }
        return { ...acc, [subject_slug]: content.subject };
      }, {});
    }
    return names;
  };
})();

export const getItems = async (id: ItemData["category_id"]) => {
  if (!id) {
    return {};
  }
  const endorsements = await getEndorsements();
  const sources = await getSources();
  const contents = (await getRawItems())
    .filter(({ category_id }) => category_id === id)
    .sort((a, b) => a.list_id - b.list_id);
  return contents.reduce((acc: Items, itemData) => {
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
