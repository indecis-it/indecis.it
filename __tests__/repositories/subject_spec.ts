import { mockedDtaService } from "../mocks/dataService";
import { SubjectRepository } from "../../repositories/subject";

const subjectRepository = SubjectRepository(mockedDtaService);

describe("Subjects", () => {
  it("has the correct subjects", async () => {
    const subjects = await subjectRepository.getSubjects();
    return expect(subjects).toMatchObject([
      expect.objectContaining({
        id: 2,
        hasSources: true,
        description:
          "Il cuneo fiscale è un indicatore percentuale che indica il rapporto tra tutte le imposte sul lavoro (dirette, indirette e contributi previdenziali) e il costo del lavoro complessivo.",
        slug: "taglio-del-cuneo-fiscale",
        sources: [
          {
            source: "Wikipedia",
            title: "Cuneo Fiscale",
            uid: "subject-2",
            url: "https://it.wikipedia.org/wiki/Cuneo_fiscale",
          },
          {
            source: "Pagella Politica",
            title: "Guida alla lettura dei sondaggi politici",
            uid: "article-2-1",
            url: "https://pagellapolitica.it/articoli/guida-sondaggi-politici",
          },
        ],
        subject: "Taglio del cuneo fiscale",
      }),
      expect.objectContaining({
        id: 3,
        hasSources: false,
        description:
          'I lavoratori autonomi e i liberi professionisti sono tenuti ad aprire una partita IVA. L\'enorme espansione del numero degli interessati ha fatto nascere in Italia l\'espressione "il popolo delle partite IVA". In questo contesto quando si dice "è una partita IVA" s\'intende una persona che ha una partita IVA, che lavora a partita IVA.',
        slug: "taglio-delle-tasse-per-le-partite-iva",
        sources: [],
        subject: "Taglio delle tasse per le partite IVA",
      }),
      expect.objectContaining({
        id: 1,
        hasSources: true,
        description: "Desc",
        slug: "tetto-al-prezzo-del-gas",
        sources: [
          {
            source: null,
            title: "Tetto al prezzo del gas",
            uid: "subject-1",
            url: "https://it.wikipedia.org/wiki/Tariffe_del_gas",
          },
        ],
        subject: "Tetto al prezzo del gas",
      }),
      expect.objectContaining({
        id: 4,
        hasSources: true,
        description: "",
        slug: "tutela-dellambiente-e-del-paesaggio",
        sources: [
          {
            source: "Pagella Politica",
            title:
              "Tutti commentano il programma di Fdi, che però ancora non c’è",
            uid: "article-4-3",
            url: "https://pagellapolitica.it/articoli/vecchi-programmi-fdi",
          },
        ],
        subject: "Tutela dell'ambiente e del paesaggio",
      }),
    ]);
  });

  describe("when no items contain the subject", () => {
    it("filters out the subjects", async () => {
      const subjects = await subjectRepository.getSubjects();
      return expect(subjects).toMatchObject([
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ id: 3 }),
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ id: 4 }),
      ]);
    });
  });
});
