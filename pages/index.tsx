import type { NextPage } from "next";
import {
  Button,
  createStyles,
  Divider,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { CategoryModel, CategorySimple } from "../models/categories";
import React, { ChangeEventHandler } from "react";
import { DefaultProps } from "@mantine/styles";
import { originalDescription, originalImage, siteName } from "../global/config";
import Head from "next/head";
import { useRouter } from "next/router";
import { Main } from "../components/Main";
import { useMediaQuery } from "@mantine/hooks";
import { SubjectFinder } from "../components/SubjectFinder";
import { SubjectRepository, SubjectSimple } from "../repositories/subject";
import { grey } from "../colors";
import { onBoardingFontSize } from "../styles";
import { MainHeader } from "../components/MainHeader";

interface Props extends DefaultProps {
  categories: CategorySimple[];
  subjects: SubjectSimple[];
}

const useStyles = createStyles((theme) => ({
  categories: {
    justifyContent: "space-between",
    marginBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: "center",
      maxWidth: "90%",
      marginRight: "auto",
      marginBottom: 40,
      marginLeft: "auto",
    },
  },
  categoryButton: {
    flexBasis: 300,
    flexGrow: 1,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      flexBasis: 0,
      flexGrow: 0,
    },
  },
  pick: {
    fontSize: onBoardingFontSize,
    marginTop: 40,
    marginBottom: 40,
    textAlign: "center",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginTop: 0,
    },
  },
  subjectFinder: {
    margin: "0 auto",
    padding: 20,
    paddingTop: 30,
    maxWidth: 390,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginBottom: 40,
      maxWidth: 580,
    },
  },
  tagline: {
    fontSize: 18,
    marginTop: -20,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 36,
      marginTop: 20,
      marginBottom: 100,
    },
  },
}));

const Home: NextPage<Props> = ({ categories, subjects, style }: Props) => {
  const router = useRouter();
  const currentUrl = `https://${siteName}${router.asPath}`;
  const title = `indecis.it | ${originalDescription}`;
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`,
    true
  );
  const navigate = (category: CategorySimple["slug"]) =>
    router.push(`/tematica/${category}`);
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
      <MainHeader />
      <Text align="center" size={"xl"} className={classes.tagline}>
        I programmi elettorali a portata di click
      </Text>
      {largeScreen ? null : (
        <Divider
          my="sm"
          style={{
            borderTopColor: grey,
            marginTop: 40,
          }}
        />
      )}
      <Text className={classes.pick}>Scegli una tematica</Text>
      <Group position="center" className={classes.categories}>
        {categories.map((category) => {
          return (
            <Button
              key={category.id}
              color="indigo-green.9"
              size={largeScreen ? "xl" : "sm"}
              variant="outline"
              className={classes.categoryButton}
              onClick={() => navigate(category.slug)}
            >
              {category.name}
            </Button>
          );
        })}
      </Group>
      <Text
        style={{
          fontSize: onBoardingFontSize,
          textAlign: "center",
        }}
      >
        {"oppure cerca un argomento di interesse"}
      </Text>
      <SubjectFinder
        subjects={subjects}
        current={""}
        size={largeScreen ? "xl" : "md"}
        className={classes.subjectFinder}
      />
      {largeScreen ? null : (
        <Divider
          my="sm"
          style={{
            borderTopColor: grey,
            marginTop: 40,
          }}
        />
      )}
      <Main />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const categoryModel = CategoryModel();
  const subjectRepository = SubjectRepository();
  const categories = await categoryModel.getCategories();
  const subjects = await subjectRepository.getSubjects();
  return { props: { categories, subjects } as Props };
}
