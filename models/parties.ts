import path from "path";
import fsPromises from "fs/promises";

export interface Party {
  id: number;
  party: string;
  list: string;
  slug: string;
  symbol_name: string;
}

export const getParties = (() => {
  const contentsPath = path.join(process.cwd(), "./data/parties.json");
  let parties: Party[] = [];
  return async () => {
    if (!parties.length) {
      const contentsData = await fsPromises.readFile(contentsPath);
      parties = JSON.parse(contentsData.toString());
    }
    return parties;
  };
})();

export const getLists = (() => {
  let lists: Party[] = [];
  return async () => {
    if (!lists.length) {
      lists = (await getParties()).reduce((acc, party) => {
        const excludeParty = acc.find(({ slug }) => slug === party.slug);
        if (excludeParty) {
          return acc;
        }
        return [...acc, party];
      }, [] as Party[]);
    }
    return lists;
  };
})();
