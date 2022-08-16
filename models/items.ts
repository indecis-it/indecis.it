import { Content, getContents } from "./contents";

export type Items = Record<Content["item_slug"], Content[]>;

export const getItems = async (id: Content["category_id"]) => {
  if (!id) {
    return {};
  }
  const contents = (await getContents())
    .filter(({ category_id }) => category_id === id)
    .sort((a, b) => a.list_id - b.list_id);
  return contents.reduce((acc: Items, content) => {
    const { item_slug } = content;
    const current = acc[item_slug] || [];
    if (!item_slug) {
      return acc;
    }
    return { ...acc, [item_slug]: [...current, content] };
  }, {});
};
