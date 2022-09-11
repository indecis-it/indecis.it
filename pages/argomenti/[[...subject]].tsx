import React from "react";
import {
  createStyles,
  Divider,
  Grid,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { ListModel } from "../../models/lists";
import { Item, ItemRepository } from "../../repositories/item";
import { SubjectRepository, SubjectSimple } from "../../repositories/subject";
import {
  categoryDescription,
  originalDescription,
  originalImage,
  siteName,
} from "../../global/config";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextLink } from "@mantine/next";
import { ListData } from "../../services/data";
import { bluePP, grey } from "../../colors";
import { ContentGroup } from "../../components/ContentGroup";
import { HomeSectionTitle } from "../../components/HomeSectionTitle";
import { MainHeader } from "../../components/MainHeader";

interface StaticPropsParams {
  params: { subject: string[] };
}

interface Props {
  items: Item[];
  lists: ListData[];
  subject: SubjectSimple;
}

const useStyles = createStyles((theme) => ({
  header: {
    background: "white",
    paddingTop: 20,
  },
  furtherResources: {
    background: "#EAF5FA",
    paddingBottom: "50px !important",
  },
  furtherResourcesContent: {
    margin: "0 auto",
    paddingRight: 20,
    paddingLeft: 20,
    maxWidth: 800,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
}));

const itemRepo = ItemRepository();
const listModel = ListModel();
const subjectRepo = SubjectRepository();

const App = ({ items, subject }: Props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const [{ category: currentCategory, categorySlug: categorySlug }] = items;
  const currentSubject = subject.subject;
  const currentUrl = `https://${siteName}${router.asPath}`;
  const description = categoryDescription(currentSubject.toLowerCase());
  const title = `Confronta i programmi elettorali su: ${currentSubject.toLowerCase()} | ${siteName} | ${originalDescription} `;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          property="twitter:card"
          content="summary_large_image"
          key="twcard"
        />
        <meta name="twitter:title" content={title} key="twtitle" />
        <meta
          name="twitter:description"
          content={description}
          key="twdescription"
        />
        <meta name="twitter:image" content={originalImage} key="twimage" />

        {/* Open Graph */}
        <meta property="og:url" content={currentUrl} key="ogurl" />
        <meta property="og:image" content={originalImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <MainHeader />
      <main
        style={{
          background: "white",
        }}
      >
        <Divider
          my="sm"
          style={{
            borderTopColor: grey,
            marginBottom: 30,
          }}
        />
        <Title
          style={{
            color: bluePP,
            fontWeight: "normal",
            textAlign: "center",
          }}
          order={6}
        >
          <NextLink href={`/tematica/${categorySlug}`}>
            {currentCategory}
          </NextLink>
        </Title>
        <Title
          style={{
            textAlign: "center",
          }}
          order={3}
        >
          {currentSubject}
        </Title>
        <Text
          style={{
            marginTop: 30,
            marginRight: "auto",
            marginBottom: 30,
            marginLeft: "auto",
            paddingRight: 30,
            paddingLeft: 30,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {subject.description}
        </Text>
        <Grid
          style={{
            margin: "0 auto",
          }}
        >
          <div
            style={{
              // @ts-ignore
              "--radix-scroll-area-corner-height": 0,
              "--radix-scroll-area-corner-width": 0,
              height: "100%",
              width: "100%",
            }}
          >
            <Divider
              my="sm"
              style={{
                borderTopColor: grey,
                marginBottom: 40,
              }}
            />
            <ContentGroup items={items} />;
          </div>
        </Grid>
        {subject.hasSources ? (
          <Paper p="md" className={classes.furtherResources}>
            <section className={classes.furtherResourcesContent}>
              <HomeSectionTitle>Approfondisci il tema</HomeSectionTitle>
              {subject.sources.map((source) => {
                return (
                  <Group
                    key={source.uid}
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <Text>
                      •{" "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: bluePP,
                        }}
                      >
                        {source.title}
                      </a>{" "}
                      su {source.source}
                    </Text>
                  </Group>
                );
              })}
            </section>
          </Paper>
        ) : null}
      </main>
    </>
  );
};
export default App;

export async function getStaticPaths() {
  const subjects = await subjectRepo.getSubjects();
  const paths = subjects.map(({ slug }) => ({ params: { subject: [slug] } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const subject =
    (await subjectRepo.getSubjectsBySlug(params.subject)) ||
    ({} as SubjectSimple);
  const items = await itemRepo.getItemsBySubjectSlug(subject?.slug);
  const lists = await listModel.getLists();
  return { props: { items, lists, subject } };
}
