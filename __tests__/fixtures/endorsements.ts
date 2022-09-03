import { Endorsement, EndorsementData } from "../../services/data";

export const endorsementsData: EndorsementData[] = [
  {
    id: 1,
    description: "favorevole",
    icon: Endorsement.GREEN,
    color_code: "#50CEBB",
  },
  {
    id: 2,
    description: "neutro",
    icon: Endorsement.YELLOW,
    color_code: "#EDD019",
  },
  {
    id: 3,
    description: "contrario",
    icon: Endorsement.RED,
    color_code: "#F6737A",
  },
  {
    id: 4,
    description: "non trovato",
    icon: Endorsement.GREY,
    color_code: "#CFCDCD",
  },
];
