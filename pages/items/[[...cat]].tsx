import React from "react";
import { createStyles, Divider, Grid, ScrollArea } from "@mantine/core";
import {
  Category,
  findCategoryBySlug,
  getCategories,
} from "../../models/categories";
import { getLists, List } from "../../models/lists";
import { getItems, getSubjects, Items, Subjects } from "../../models/items";
import { ContentsHeader } from "../../components/ContentsHeader";
import { ContentRow } from "../../components/ContentRow";
import { grey } from "../../colors";
import Image from "next/image";
import { CategorySelection } from "../../components/CategorySelection";
import { NextLink } from "@mantine/next";
import Head from "next/head";
import {
  categoryDescription,
  originalImage,
  siteName,
} from "../../global/config";
import { useRouter } from "next/router";

interface StaticPropsParams {
  params: { cat: string[] };
}

interface Props {
  categories: Category[];
  current: Category;
  items: Items;
  lists: List[];
  subjects: Subjects;
}

const useStyles = createStyles((theme) => ({
  select: {
    margin: "0 auto",
    maxWidth: 500,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      maxWidth: "none",
    },
  },
}));

const App = ({ categories, current, items, lists, subjects }: Props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const currentCategory = current.name_it.toLowerCase();
  const currentUrl = `https://${siteName}${router.asPath}`;
  const description = categoryDescription(currentCategory);
  const title = `Le posizioni delle liste su: ${currentCategory} | ${siteName}`;
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
      <header
        style={{
          paddingTop: 20,
          textAlign: "center",
        }}
      >
        <NextLink href={"/"}>
          <Image
            src={`/indecis-it-logo-diff.svg`}
            alt="Il logo di indecis.it"
            width={80}
            height={80}
          />
        </NextLink>
      </header>
      <CategorySelection
        categories={categories}
        current={current}
        className={classes.select}
      />
      <Divider my="sm" />
      <Grid
        style={{
          margin: "0 auto",
        }}
      >
        <ScrollArea type="never" style={{ height: "100%", width: "100%" }}>
          <ContentsHeader lists={lists} />
          <Divider
            my="sm"
            style={{
              borderTopColor: grey,
              marginBottom: 0,
            }}
          />
          {Object.keys(items).map((slug, key) => (
            <ContentRow
              key={slug}
              initialOpen={key === 0}
              items={items[slug]}
              topic={subjects[slug]}
            />
          ))}
        </ScrollArea>
      </Grid>
    </>
  );
};
export default App;

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map(({ slug }) => ({ params: { cat: [slug] } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const current = (await findCategoryBySlug(params.cat)) || ({} as Category);
  const categories = await getCategories();
  const subjects = await getSubjects();
  const items = await getItems(current.id);
  const lists = await getLists();
  return { props: { categories, current, items, lists, subjects } };
}
