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
  let categories: Category[] = [];
  return async () => {
    if (!categories.length) {
      categories = await fetch(
        "https://raw.githubusercontent.com/indecis-it/data/main/data/categories.json?token=GHSAT0AAAAAABXS3HBJ3YJOACEUWL4A3VLMYX6NDJA"
      ).then((response) => response.json());
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
  slug: Category["slug"][]
): Promise<Category | undefined> =>
  (await getCategories()).find((cat) => slug.includes(cat.slug));
