import { ArticleData, dataService, SubjectData } from "../services/data";

interface SubjectSource {
  uid: string;
  source: string | null;
  title: string | null;
  url: string;
}

export interface SubjectSimple
  extends Omit<Omit<SubjectData, "url">, "source"> {
  hasSources: boolean;
  sources: SubjectSource[];
}

const getSources = (
  subject: SubjectData,
  articles: ArticleData[] = []
): SubjectSource[] => {
  const subjectSource = subject.url
    ? {
        uid: `subject-${subject.id}`,
        source: subject.source || null,
        title: subject.title || subject.subject || null,
        url: subject.url,
      }
    : null;

  return [
    subjectSource as SubjectSource,
    ...articles.map((article) => ({
      uid: `article-${subject.id}-${article.id}`,
      source: article.source,
      title: article.post_title,
      url: article.url,
    })),
  ].filter(Boolean);
};

export const SubjectRepository = (
  service: typeof dataService = dataService
) => {
  const getSubjects = (() => {
    let subjects: SubjectSimple[];
    return async () => {
      if (!subjects) {
        const articles = await service.getArticlesData();
        const items = await service.getItemsData();
        subjects = (await service.getSubjectsData())
          .filter((subject) =>
            items.find((item) => item.subject_slug === subject.slug)
          )
          .map((subject) => {
            const amendedArticles = articles
              .filter(
                (article) => article.subject_id === subject.id && article.url
              )
              .reduce((acc, article) => {
                const isArticlePresent = acc.find(
                  (ar) => ar.post_id === article.post_id
                );
                if (isArticlePresent) {
                  return acc;
                }
                return [...acc, article];
              }, [] as ArticleData[]);
            const sources = getSources(subject, amendedArticles);
            return {
              id: subject.id,
              hasSources: !!sources.length,
              description: subject.description,
              slug: subject.slug,
              sources,
              subject: subject.subject,
            };
          });
      }
      return subjects.sort((a, b) => a.slug.localeCompare(b.slug));
    };
  })();

  const getSubjectsBySlug = async (slug: SubjectSimple["slug"][]) =>
    (await getSubjects()).find((subject) => slug.includes(subject.slug));

  const getSubjectTitles = async () =>
    (await getSubjects()).reduce((acc, subject) => {
      return { ...acc, [subject.slug]: subject.subject };
    }, {});

  return {
    getSubjects,
    getSubjectsBySlug,
    getSubjectTitles,
  };
};
