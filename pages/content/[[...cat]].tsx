import { Accordion, MantineProvider } from "@mantine/core";
import { getCategories } from "../service/categories";
import { Content, getContents } from "../service/contents";

interface StaticPropsParams {
  params: { cat: string };
}

interface CategoryProps {
  contents: Content[];
}

const List = ({ elements }: { elements: Content[] }) =>
  elements.map(({ id, item, icon, description, source_title }) => (
    <div key={id}>
      <div>{item}</div>
      <Accordion>
        <Accordion.Item value={icon}>
          <Accordion.Control>🟢</Accordion.Control>
          <Accordion.Panel>{description}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  ));

const Category = ({ contents }: CategoryProps) => {
  const elements = contents.sort((a, b) => a.list_id - b.list_id);
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <List elements={elements} />
    </MantineProvider>
  );
};
export default Category;

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map(({ slug }) => ({ params: { cat: [slug] } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const categories = await getCategories();
  const allContents = await getContents();
  const { id } = categories.find((cat) => params.cat.includes(cat.slug)) || {};
  const contents = allContents.filter(({ category_id }) => category_id === id);
  return { props: { contents } } as { props: CategoryProps };
}
