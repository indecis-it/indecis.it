import React, { useState } from "react";
import { Divider, Grid, MantineProvider, ScrollArea } from "@mantine/core";
import {
  Category,
  findCategoryBySlug,
  getCategories,
} from "../../models/categories";
import { getLists, Party } from "../../models/parties";
import { getItems, Items } from "../../models/items";
import { getTopics, Topic } from "../../models/contents";
import { ContentsHeader } from "../../components/ContentsHeader";
import { ContentRow } from "../../components/ContentRow";
import { grey } from "../../colors";
import Image from "next/image";

import { CustomFonts } from "../../fonts";
import { CategorySelection } from "../../components/CategorySelection";
import { NextLink } from "@mantine/next";

interface StaticPropsParams {
  params: { cat: string[] };
}

interface Props {
  categories: Category[];
  current: Category;
  items: Items;
  lists: Party[];
  topics: Topic;
}

const App = ({ categories, current, items, lists, topics }: Props) => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: "light",
        black: "#363636",
        fontFamily: "Raleway, sans-serif",
      }}
    >
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
      <CategorySelection categories={categories} current={current} />
      <Divider my="sm" />
      <Grid
        style={{
          // minHeight: "100vh",
          margin: 0,
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
          {Object.keys(items).map((slug) => (
            <ContentRow key={slug} items={items[slug]} topic={topics[slug]} />
          ))}
        </ScrollArea>
      </Grid>
    </MantineProvider>
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
  const topics = await getTopics();
  const items = await getItems(current.id);
  const lists = await getLists();
  return { props: { categories, current, items, lists, topics } };
}
