import { dataService, ListData } from "../services/data";

export const ListModel = (service: typeof dataService = dataService) => {
  const getLists = (() => {
    let lists: ListData[] = [];
    return async () => {
      if (!lists.length) {
        lists = (await service.getListsData()).reduce((acc, list) => {
          const excludeList = acc.find(({ slug }) => slug === list.slug);
          if (excludeList || !list.symbol_url) {
            return acc;
          }
          const slug = list.slug.replaceAll(/\'/g, "-");
          return [...acc, { ...list, slug }];
        }, [] as ListData[]);
      }
      return lists;
    };
  })();

  return {
    getLists,
  };
};
