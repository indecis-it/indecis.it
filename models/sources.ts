export interface SourceSimple {
  content: string;
  title: string;
  url: string;
}

export interface Source extends SourceSimple {
  id: number;
  list: string;
  slug: string;
}

export const getSources = (() => {
  let sources: Source[] = [];
  return async () => {
    if (!sources.length) {
      sources = await fetch(
        "https://raw.githubusercontent.com/indecis-it/data/main/data/sources.json"
      ).then((response) => response.json());
    }
    return sources;
  };
})();
