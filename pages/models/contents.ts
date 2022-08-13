import path from "path";
import fsPromises from "fs/promises";

export interface Content {
  id: number;
  category_id: number;
  category: string;
  description: string;
  endorsement: string;
  item: string;
  item_slug: string;
  list: string;
  list_id: number;
  source_title: string;
}

export type ItemNames = Record<Content["item"], Content>;

export const getContents = (() => {
  const contentsPath = path.join(process.cwd(), "./data/contents.json");
  let contents: Content[] = [];
  return async () => {
    if (!contents.length) {
      const contentsData = await fsPromises.readFile(contentsPath);
      contents = JSON.parse(contentsData.toString());
    }
    return contents;
  };
})();

export const getItemNames = (() => {
  let names: ItemNames | null = null;
  return async () => {
    if (!names) {
      names = (await getContents()).reduce((acc: ItemNames, content) => {
        const { item_slug } = content;
        const current = acc[item_slug];
        if (!item_slug || current) {
          return acc;
        }
        return { ...acc, [item_slug]: content };
      }, {});
    }
    return names;
  };
})();
