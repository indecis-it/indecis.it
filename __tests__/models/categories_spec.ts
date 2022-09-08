import { CategoryModel } from "../../models/categories";
import { mockedDtaService } from "../mocks/dataService";

const categoryModel = CategoryModel(mockedDtaService);

describe("Categories", () => {
  describe("with empty list id", () => {
    it("presents the correct description", async () => {
      const categories = await categoryModel.getCategories();
      return expect(categories).toMatchObject([
        expect.objectContaining({ id: 4 }),
        expect.objectContaining({
          id: 2,
          name: "Difesa",
          description:
            "Difesa militare; difesa civile; Aiuti militari stranieri, R&S relativi alla difesa; Difesa N.E.C.",
        }),
        expect.objectContaining({ id: 9 }),
        expect.objectContaining({ id: 3 }),
        expect.objectContaining({ id: 5 }),
        expect.objectContaining({ id: 10 }),
        expect.objectContaining({ id: 8 }),
        expect.objectContaining({ id: 7 }),
        expect.objectContaining({ id: 6 }),
        expect.objectContaining({
          id: 1,
          name: "Servizi pubblici generali",
          description:
            "Organi esecutivi e legislativi, affari finanziari e fiscali, affari esterni; aiuti economici stranieri; servizi generali; ricerca di base; R&S relativa ai servizi pubblici generali; Servizi pubblici generali N.E.C.; Transazioni del debito pubblico, trasferimenti di un carattere generale tra diversi livelli di governo.",
        }),
        expect.objectContaining({ id: 11 }),
      ]);
    });
  });
});
