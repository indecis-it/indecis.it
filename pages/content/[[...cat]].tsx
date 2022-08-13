import { Divider, MantineProvider } from "@mantine/core";
import {
  CategoryNames,
  findCategoryBySlug,
  getCategories,
} from "../models/categories";
import { ContentsHeader } from "../../components/ContentsHeader";
import { getLists, Party } from "../models/parties";
import { ContentsList } from "../../components/contents-list";
import { getItems, Items } from "../models/items";
import { getItemNames } from "../models/contents";

interface StaticPropsParams {
  params: { cat: string };
}

interface Props {
  items: Items;
  lists: Party[];
  names: CategoryNames;
}

const App = ({ items, lists, names }: Props) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <ContentsHeader lists={lists} />
      <Divider my="sm" />
      <ContentsList names={names} items={items} />
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
