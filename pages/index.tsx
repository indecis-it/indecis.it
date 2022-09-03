import type { NextPage } from "next";
import { Text } from "@mantine/core";
import { CategoryModel, CategorySimple } from "../models/categories";
import React from "react";
import { CategorySelector } from "../components/CategorySelector";
import Image from "next/image";
import { DefaultProps } from "@mantine/styles";
import { originalDescription, originalImage, siteName } from "../global/config";
import Head from "next/head";
import { useRouter } from "next/router";
import { Main } from "../components/Main";

interface Props extends DefaultProps {
  categories: CategorySimple[];
}

const categoryModel = CategoryModel();

const Home: NextPage<Props> = ({ categories, style }: Props) => {
  const router = useRouter();
  const currentUrl = `https://${siteName}${router.asPath}`;
  const title = `indecis.it | ${originalDescription}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={originalDescription} />

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
          content={originalDescription}
          key="twdescription"
        />
        <meta name="twitter:image" content={originalImage} key="twimage" />

        {/* Open Graph */}
        <meta property="og:url" content={currentUrl} key="ogurl" />
        <meta property="og:image" content={originalImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta
          property="og:description"
          content={originalDescription}
          key="ogdesc"
        />
      </Head>
      <header
        style={{
          ...style,
          paddingTop: 20,
          textAlign: "center",
        }}
      >
        <Image
          src={`/indecis-it-logo-diff.svg`}
          alt="Il logo di indecis.it"
          height={300}
          width={380}
        />
        <Text
          align="center"
          size={"xl"}
          style={{
            marginBottom: 60,
          }}
        >
          I programmi elettorali a portata di click
        </Text>
      </header>
      <CategorySelector
        categories={categories}
        current={""}
        size={"md"}
        style={{
          margin: "0 auto",
          padding: 20,
          paddingTop: 30,
          maxWidth: 500,
        }}
      />
      <Main />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const categories = await categoryModel.getCategories();
  return { props: { categories } as Props };
}
