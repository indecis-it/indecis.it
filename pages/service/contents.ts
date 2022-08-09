import path from "path";
import fsPromises from "fs/promises";

export interface Content {
  id: number;
  category_id: number;
  category: string;
  description: string;
  icon: string;
  item: string;
  item_slug: string;
  list: string;
  list_id: number;
  source_title: string;
}

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
