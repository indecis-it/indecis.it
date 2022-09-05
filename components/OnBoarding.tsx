import {
  Card,
  createStyles,
  Group,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import {
  onBoardingFontSize,
  onBoardingImageHeight,
  onBoardingImageWidth,
  useCommonStyles,
} from "../styles";
import { HomeSectionTitle } from "./HomeSectionTitle";
import { useMediaQuery } from "@mantine/hooks";
import { DefaultProps } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  card: {
    flexDirection: "column",
    alignItems: "baseline",
  },
  scrollGroup: {
    marginLeft: 30,
    width: onBoardingImageWidth * 4 + 90,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
}));

interface Props extends DefaultProps {}

export const OnBoarding = ({ style }: Props) => {
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`,
    true
  );
  const {
    classes: { homeSection },
  } = useCommonStyles({});
  const {
    classes: { card, scrollGroup },
  } = useStyles();

  return (
    <section
      style={{
        ...style,
      }}
    >
      <HomeSectionTitle className={homeSection}>
        Bella idea, ma come funziona?
      </HomeSectionTitle>
      <Text
        className={homeSection}
        style={{
          fontSize: onBoardingFontSize,
          marginBottom: 40,
        }}
      >
        Seleziona dal menu le tematiche al centro dei programmi elettorali. Per
        ognuna potrai confrontare la posizione di ogni singolo partito e capire
        chi è più in linea con le tue idee. Il tutto in 4 semplici mosse:
      </Text>
      <ScrollArea
        type={"never"}
        style={{
          height: onBoardingImageHeight + 100,
          width: "100%",
        }}
      >
        <Group
          position={largeScreen ? "center" : "left"}
          className={scrollGroup}
        >
          <Group className={card}>
            <HomeSectionTitle
              style={{
                paddingBottom: 0,
              }}
            >
              1. Scegli la tematica
            </HomeSectionTitle>
            <Card
              shadow={"sm"}
              radius="md"
              withBorder
              style={{
                border: "none !important",
              }}
            >
              <Card.Section>
                <Image
                  src={"/onboarding/01_tematica.png"}
                  height={onBoardingImageHeight}
                  width={onBoardingImageWidth}
                />
              </Card.Section>
            </Card>
          </Group>
          <Group className={card}>
            <HomeSectionTitle
              style={{
                paddingBottom: 0,
              }}
            >
              2. Scorri i temi
            </HomeSectionTitle>
            <Card
              shadow={"sm"}
              radius="md"
              withBorder
              style={{
                border: "none !important",
              }}
            >
              <Card.Section>
                <Image
                  src={"/onboarding/02_temi.png"}
                  height={onBoardingImageHeight}
                  width={onBoardingImageWidth}
                />
              </Card.Section>
            </Card>
          </Group>
          <Group className={card}>
            <HomeSectionTitle
              style={{
                paddingBottom: 0,
              }}
            >
              3. Visiona la fonte
            </HomeSectionTitle>
            <Card
              shadow={"sm"}
              radius="md"
              withBorder
              style={{
                border: "none !important",
              }}
            >
              <Card.Section>
                <Image
                  src={"/onboarding/03_fonte.png"}
                  height={onBoardingImageHeight}
                  width={onBoardingImageWidth}
                />
              </Card.Section>
            </Card>
          </Group>
          <Group className={card}>
            <HomeSectionTitle
              style={{
                paddingBottom: 0,
              }}
            >
              4. Naviga le altre liste
            </HomeSectionTitle>
            <Card
              shadow={"sm"}
              radius="md"
              withBorder
              style={{
                border: "none !important",
              }}
            >
              <Card.Section>
                <Image
                  src={"/onboarding/04_naviga.png"}
                  height={onBoardingImageHeight}
                  width={onBoardingImageWidth}
                />
              </Card.Section>
            </Card>
          </Group>
        </Group>
      </ScrollArea>
    </section>
  );
};
