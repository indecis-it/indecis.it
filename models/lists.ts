import { dataService, ListData } from "../services/data";

export const ListModel = (service: typeof dataService = dataService) => {
  const getLists = (() => {
    let lists: ListData[] = [];
    return async () => {
      if (!lists.length) {
        lists = (await service.getListsData()).reduce((acc, party) => {
          const excludeParty = acc.find(({ slug }) => slug === party.slug);
          if (excludeParty) {
            return acc;
          }
          return [...acc, party];
        }, [] as ListData[]);
      }
      return lists;
    };
  })();

  return {
    getLists,
  };
};
