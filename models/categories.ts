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

export type CategoryNames = Record<Category["slug"], Category>;

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

export const getCategoryNames = (() => {
  let names: CategoryNames | null = null;
  return async () => {
    if (!names) {
      names = (await getCategories()).reduce((acc: CategoryNames, content) => {
        const { slug } = content;
        const current = acc[slug];
        if (!slug || current) {
          return acc;
        }
        return { ...acc, [slug]: content };
      }, {});
    }
    return names;
  };
})();

export const findCategoryBySlug = async (
  slug: Category["slug"]
): Promise<Category | undefined> =>
  (await getCategories()).find((cat) => slug.includes(cat.slug));
