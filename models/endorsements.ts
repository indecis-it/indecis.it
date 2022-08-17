import path from "path";
import fsPromises from "fs/promises";
import { Property } from "csstype";
import Color = Property.Color;

interface Endorsement {
  id: 1;
  description: string;
  icon: string;
  color_code: Color;
}

export const getEndorsements = (() => {
  const contentsPath = path.join(process.cwd(), "./data/endorsements.json");
  let endorsements: Endorsement[] = [];
  return async () => {
    if (!endorsements.length) {
      const contentsData = await fsPromises.readFile(contentsPath);
      endorsements = JSON.parse(contentsData.toString());
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
