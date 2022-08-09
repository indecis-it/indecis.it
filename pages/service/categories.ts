import path from "path";
import fsPromises from "fs/promises";

export interface Category {
  id: number;
  description_en: string;
  description_it: string;
  name_en: string;
  name_it: string;
  slug: string;
}

export const getCategories = (() => {
  const categoriesPath = path.join(process.cwd(), "./data/categories.json");
  let categories: Category[] = [];
  return async () => {
    if (!categories.length) {
      const categoriesData = await fsPromises.readFile(categoriesPath);
      categories = JSON.parse(categoriesData.toString());
    }
    return categories;
  };
})();
