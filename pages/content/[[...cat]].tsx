import React, { useState } from "react";
import {
  Divider,
  Grid,
  MantineProvider,
  ScrollArea,
  Select,
} from "@mantine/core";
import {
  Category,
  findCategoryBySlug,
  getCategories,
} from "../../models/categories";
import { getLists, Party } from "../../models/parties";
import { getItems, Items } from "../../models/items";
import { getContents, getItemNames, ItemNames } from "../../models/contents";
import { ContentsHeader } from "../../components/ContentsHeader";
import { ContentRow } from "../../components/ContentRow";
import { useRouter } from "next/router";
import { grey } from "../../colors";

interface StaticPropsParams {
  params: { cat: string[] };
}

interface Props {
  categories: Category[];
  current: Category["slug"];
  items: Items;
  lists: Party[];
  names: ItemNames;
}

const App = ({ categories, current, items, lists, names }: Props) => {
  const router = useRouter();
  const navigate = (value: string) => router.push(value);
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Select
        data={categories.map(({ name_it, slug }) => ({
          label: name_it,
          value: slug,
        }))}
        label=""
        placeholder="Seleziona un argomento"
        value={current}
        style={{
          padding: 20,
          paddingTop: 30,
        }}
        onChange={navigate}
      />
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
            <ContentRow
              key={slug}
              contents={items[slug]}
              item={names[slug].item}
            />
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
  const { id } = (await findCategoryBySlug(params.cat)) || {};
  const categories = await getCategories();
  const [current] = params.cat;
  const names = await getItemNames();
  const items = await getItems(id as number);
  const lists = await getLists();
  return { props: { categories, current, items, lists, names } };
}
