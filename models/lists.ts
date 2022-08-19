export interface List {
  id: number;
  list: string;
  slug: string;
  symbol_name: string;
}

export const getListData = (() => {
  let parties: List[] = [];
  return async () => {
    if (!parties.length) {
      parties = await fetch(
        "https://raw.githubusercontent.com/indecis-it/data/de4c0f0375089d11b3fce7429e2eefb095500fc4/data/lists.json"
      ).then((response) => response.json());
    }
    return parties;
  };
})();

export const getLists = (() => {
  let lists: List[] = [];
  return async () => {
    if (!lists.length) {
      lists = (await getListData()).reduce((acc, party) => {
        const excludeParty = acc.find(({ slug }) => slug === party.slug);
        if (excludeParty) {
          return acc;
        }
        return [...acc, party];
      }, [] as List[]);
    }
    return lists;
  };
})();
