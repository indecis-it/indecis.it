export interface Category {
  id: number;
  description_en: string;
  description_it: string;
  name_en: string;
  name_it: string;
  slug: string;
}

export const getCategories = (() => {
  let categories: Category[] = [];
  return async () => {
    if (!categories.length) {
      categories = await fetch(
        "https://raw.githubusercontent.com/indecis-it/data/main/data/categories.json"
      ).then((response) => response.json());
    }
    return categories;
  };
})();

export const findCategoryBySlug = async (
  slug: Category["slug"][]
): Promise<Category | undefined> =>
  (await getCategories()).find((cat) => slug.includes(cat.slug));
