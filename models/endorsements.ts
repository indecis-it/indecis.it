import { dataService, EndorsementData } from "../services/data";

export const EndorsementModel = (service: typeof dataService = dataService) => {
  const getEndorsements = (() => {
    let endorsements: EndorsementData[] = [];
    return async () => {
      if (!endorsements.length) {
        endorsements = await service.getEndorsementsData();
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
    getEndorsements,
  };
};
