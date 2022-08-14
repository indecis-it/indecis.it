import React from "react";
import { Divider, Grid, MantineProvider, ScrollArea } from "@mantine/core";
import { findCategoryBySlug, getCategories } from "../models/categories";
import { getLists, Party } from "../models/parties";
import { getItems, Items } from "../models/items";
import { getItemNames, ItemNames } from "../models/contents";
import { ContentsHeader } from "../../components/ContentsHeader";
import { ContentRow } from "../../components/ContentRow";

interface StaticPropsParams {
  params: { cat: string };
}

interface Props {
  items: Items;
  lists: Party[];
  names: ItemNames;
}

const App = ({ items, lists, names }: Props) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Grid
        style={{
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <ScrollArea type="never" style={{ height: "100%", width: "100%" }}>
          <ContentsHeader lists={lists} />
          <Divider
            my="sm"
            style={{
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
  const names = await getItemNames();
  const items = await getItems(id as number);
  const lists = await getLists();
  return { props: { items, lists, names } };
}
