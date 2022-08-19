import { Property } from "csstype";
import Color = Property.Color;

interface Endorsement {
  id: 1;
  description: string;
  icon: string;
  color_code: Color;
}

export const getEndorsements = (() => {
  let endorsements: Endorsement[] = [];
  return async () => {
    if (!endorsements.length) {
      endorsements = await fetch(
        "https://raw.githubusercontent.com/indecis-it/data/de4c0f0375089d11b3fce7429e2eefb095500fc4/data/endorsements.json"
      ).then((response) => response.json());
    }
    return endorsements;
  };
})();

export const findEndorsementByIcon = async (
  icon: Endorsement["icon"]
): Promise<Endorsement | undefined> =>
  (await getEndorsements()).find((endorsement) =>
    icon.includes(endorsement.icon)
  );
