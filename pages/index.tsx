import type { NextPage } from "next";
import { Text } from "@mantine/core";
import { Category, getCategories } from "../models/categories";
import React from "react";
import { CategorySelector } from "../components/CategorySelector";
import Image from "next/image";
import { DefaultProps } from "@mantine/styles";

interface Props extends DefaultProps {
  categories: Category[];
}

const Home: NextPage<Props> = ({ categories, style }: Props) => {
  return (
    <>
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
          i programmi elettorali a portata di click
        </Text>
      </header>
      <CategorySelector
        categories={categories}
        current={""}
        style={{
          padding: 20,
          paddingTop: 30,
        }}
      />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const categories = await getCategories();
  return { props: { categories } as Props };
}
