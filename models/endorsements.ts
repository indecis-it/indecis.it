import {
  dataService,
  Endorsement,
  EndorsementData,
  ItemData,
} from "../services/data";
import { EndorsementSimple } from "../repositories/item";

const endorsementDescription: Record<Endorsement, string> = {
  [Endorsement.GREEN]: "La lista supporta il tema",
  [Endorsement.RED]: "La lista si oppone al tema",
  [Endorsement.YELLOW]: "La lista è neutra sul tema",
  [Endorsement.GREY]: "Il tema non è presente nelle fonti",
};

export const EndorsementModel = (service: typeof dataService = dataService) => {
  const getEndorsement = (
    itemData: ItemData,
    endorsements: EndorsementData[]
  ): EndorsementSimple => {
    const endorsement = endorsements.find((endorsement) =>
      itemData.endorsement.includes(endorsement.icon)
    );
    return endorsement
      ? {
          description: endorsement.description,
          icon: endorsement.icon,
        }
      : {
          description: endorsementDescription[Endorsement.GREY],
          icon: Endorsement.GREY,
        };
  };

  const getEndorsements = (() => {
    let endorsements: EndorsementData[] = [];
    return async () => {
      if (!endorsements.length) {
        endorsements = (await service.getEndorsementsData()).map(
          (endorsement) => ({
            ...endorsement,
            description: endorsementDescription[endorsement.icon],
          })
        );
      }
      return endorsements;
    };
  })();

  const findEndorsementByIcon = async (
    icon: EndorsementData["icon"]
  ): Promise<EndorsementData | undefined> =>
    (await getEndorsements()).find((endorsement) =>
      icon.includes(endorsement.icon)
    );

  return {
    findEndorsementByIcon,
    getEndorsement,
    getEndorsements,
  };
};
