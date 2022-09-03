import React from "react";
import { createStyles, Group, SimpleGrid, Text } from "@mantine/core";
import Image from "next/image";
import { useCommonStyles } from "../styles";
import { HomeSectionTitle } from "./HomeSectionTitle";

const iconSize = 24;

const useStyles = createStyles((theme) => ({
  list: {
    gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "row dense",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
}));

export const HowToRead = () => {
  const {
    classes: { homeSection },
  } = useCommonStyles({});

  const {
    classes: { list },
  } = useStyles();

  return (
    <section
      style={{
        margin: "0 auto",
        maxWidth: "80%",
      }}
    >
      <HomeSectionTitle>Come leggere la tabella?</HomeSectionTitle>
      <SimpleGrid
        cols={4}
        className={`${homeSection} ${list}`}
        style={{
          margin: "0 auto 40px",
        }}
      >
        <Group
          align="flex-start"
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            src="/endorsement/green.svg"
            alt="green"
            height={iconSize}
            width={iconSize}
          />
          <Text>
            La lista si è espressa <strong>a supporto</strong> del tema
          </Text>
        </Group>
        <Group
          align="flex-start"
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            src="/endorsement/red.svg"
            alt="green"
            height={iconSize}
            width={iconSize}
          />
          <Text>
            La lista si è espressa <strong>in opposizione</strong> al tema
          </Text>
        </Group>
        <Group
          align="flex-start"
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            src="/endorsement/yellow.svg"
            alt="green"
            height={iconSize}
            width={iconSize}
          />
          <Text>
            La lista esprime una posizione né favorevole né contraria (
            <strong>neutra</strong>)
          </Text>
        </Group>
        <Group
          align="flex-start"
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            src="/endorsement/grey.svg"
            alt="green"
            height={iconSize}
            width={iconSize}
          />
          <Text>
            Il tema <strong>non è presente</strong> nelle fonti a nostra
            disposizione
          </Text>
        </Group>
      </SimpleGrid>
    </section>
  );
};
