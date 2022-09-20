import React from "react";
import { createStyles, Divider, Grid } from "@mantine/core";
import { ListModel } from "../../models/lists";
import { ItemRepository, Items } from "../../repositories/item";
import { ContentsHeader } from "../../components/ContentsHeader";
import { ContentRow } from "../../components/ContentRow";
import { grey } from "../../colors";
import Head from "next/head";
import {
  categoryDescription,
  originalImage,
  siteName,
} from "../../global/config";
import { useRouter } from "next/router";
import { CategoryData, ListData } from "../../services/data";
import { CategoryModel, CategorySimple } from "../../models/categories";
import { useCommonStyles } from "../../styles";
import { SubjectRepository, SubjectSimple } from "../../repositories/subject";
import { MainHeader } from "../../components/MainHeader";

interface StaticPropsParams {
  params: { cat: string[] };
}

interface Props {
  current: CategorySimple;
  items: Items;
  lists: ListData[];
  subjectTitles: Record<SubjectSimple["slug"], SubjectSimple["subject"]>;
}

const categoryModel = CategoryModel();
const itemRepo = ItemRepository();
const listModel = ListModel();
const subjectRepo = SubjectRepository();

const App = ({ current, items, lists, subjectTitles }: Props) => {
  const {
    classes: { scrollingWidth },
  } = useCommonStyles({ list: lists });
  const router = useRouter();
  const currentCategory = current.name.toLowerCase();
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
      <MainHeader className={scrollingWidth} />
      <Divider
        my="sm"
        style={{
          borderTopColor: grey,
          marginBottom: 30,
        }}
      />
      <main
        style={{
          background: "white",
        }}
      >
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
            <ContentsHeader
              lists={lists}
              style={{
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 500,
              }}
            />
            <Divider
              my="sm"
              style={{
                borderTopColor: grey,
                marginBottom: 0,
              }}
            />
            {Object.keys(items).map((slug, _) => {
              return (
                <ContentRow
                  key={slug}
                  initialOpen={false}
                  items={items[slug]}
                  subjectSlug={slug}
                  subjectTitle={subjectTitles[slug]}
                />
              );
            })}
          </div>
        </Grid>
      </main>
    </>
  );
};
export default App;

export async function getStaticPaths() {
  const categories = await categoryModel.getCategories();
  const paths = categories.map(({ slug }) => ({ params: { cat: [slug] } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const current =
    (await categoryModel.getCategoryBySlug(params.cat)) || ({} as CategoryData);
  const subjectTitles = await subjectRepo.getSubjectTitles();
  const items = await itemRepo.getItems(current.id);
  const lists = await listModel.getLists();

  return { props: { current, items, lists, subjectTitles } };
}
