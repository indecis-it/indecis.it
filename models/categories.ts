import { dataService } from "../services/data";

export interface CategorySimple {
  id: number;
  description: string;
  name: string;
  source: "EUROSTAT" | "indecis.it" | null;
  slug: string | null;
}

export const CategoryModel = (service: typeof dataService = dataService) => {
  const getCategories = (() => {
    let categories: CategorySimple[] = [];
    return async () => {
      if (!categories.length) {
        categories = (await service.getCategoriesData()).map(
          ({
            id,
            description,
            description_it,
            name,
            name_it,
            source,
            slug,
          }) => ({
            id,
            description: description || description_it,
            name: name || name_it,
            source: source || null,
            slug: slug,
          })
        );
      }
      return categories.sort((a, b) => a.name.localeCompare(b.name));
    };
  })();

  const getCategoryById = async (
    id: CategorySimple["id"]
  ): Promise<CategorySimple | undefined> =>
    (await getCategories()).find((cat) => id === cat.id);

  const getCategoryBySlug = async (
    slug: CategorySimple["slug"][]
  ): Promise<CategorySimple | undefined> =>
    (await getCategories()).find((cat) => slug.includes(cat.slug));

  return {
    getCategoryById,
    getCategoryBySlug,
    getCategories,
  };
};
