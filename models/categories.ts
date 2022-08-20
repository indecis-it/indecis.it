import { CategoryData, dataService } from "../services/data";

export const CategoryModel = (service: typeof dataService = dataService) => {
  const getCategories = (() => {
    let categories: CategoryData[] = [];
    return async () => {
      if (!categories.length) {
        categories = await dataService.getCategoriesData();
      }
      return categories;
    };
  })();

  const findCategoryBySlug = async (
    slug: CategoryData["slug"][]
  ): Promise<CategoryData | undefined> =>
    (await getCategories()).find((cat) => slug.includes(cat.slug));

  return {
    findCategoryBySlug,
    getCategories,
  };
};
