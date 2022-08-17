import { Content, getContents } from "./contents";
import { getEndorsements } from "./endorsements";
import { Property } from "csstype";
import Color = Property.Color;

export interface Item extends Omit<Content, "endorsement"> {
  endorsement?: Color;
}

export type Items = Record<Content["item_slug"], Item[]>;

export const getItems = async (id: Content["category_id"]) => {
  if (!id) {
    return {};
  }
  const endorsements = await getEndorsements();
  const contents = (await getContents())
    .filter(({ category_id }) => category_id === id)
    .sort((a, b) => a.list_id - b.list_id);
  return contents.reduce((acc: Items, content) => {
    const { item_slug } = content;
    const current = acc[item_slug] || [];
    if (!item_slug) {
      return acc;
    }
    const endorsement = endorsements.find((endorsement) =>
      content.endorsement.includes(endorsement.icon)
    );
    return {
      ...acc,
      [item_slug]: [
        ...current,
        { ...content, endorsement: endorsement?.color_code },
      ],
    };
  }, {});
};
