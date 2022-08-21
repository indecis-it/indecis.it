import {
  Badge,
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

const useStyles = createStyles((theme) => ({
  scrollGroup: {
    marginLeft: 30,
    width: onBoardingImageWidth * 4 + 90,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
}));

export const OnBoarding = () => {
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`,
    true
  );
  const {
    classes: { homeSection },
  } = useCommonStyles({});
  const {
    classes: { scrollGroup },
  } = useStyles();

  return (
    <section>
      <HomeSectionTitle
        className={homeSection}
        style={{
          margin: "0 auto 20px",
        }}
      >
        Come funziona?
      </HomeSectionTitle>
      <Text
        className={homeSection}
        style={{
          fontSize: onBoardingFontSize,
          margin: "0 auto 40px",
        }}
      >
        Naviga le categorie per confrontare le intenzioni delle liste rispetto
        alle diverse tematiche. Ecco come fare in 4 passaggi:
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
          <Card shadow={"sm"} radius="md" withBorder>
            <Card.Section>
              <Image
                src={"/onboarding/001-seleziona-argomento.jpg"}
                height={onBoardingImageHeight}
                width={onBoardingImageWidth}
              />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Scegli un argomento</Text>
              <Badge color="red" variant="light">
                1
              </Badge>
            </Group>
          </Card>
          <Card shadow={"sm"} radius="md" withBorder>
            <Card.Section>
              <Image
                src={"/onboarding/002-scorri-lista.jpg"}
                height={onBoardingImageHeight}
                width={onBoardingImageWidth}
              />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Scorri i temi della lista</Text>
              <Badge color="red" variant="light">
                2
              </Badge>
            </Group>
          </Card>
          <Card shadow={"sm"} radius="md" withBorder>
            <Card.Section>
              <Image
                src={"/onboarding/003-espandi-argomento.jpg"}
                height={onBoardingImageHeight}
                width={onBoardingImageWidth}
              />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Vai alla fonte</Text>
              <Badge color="red" variant="light">
                3
              </Badge>
            </Group>
          </Card>
          <Card shadow={"sm"} radius="md" withBorder>
            <Card.Section>
              <Image
                src={"/onboarding/004-naviga-orizzontale.jpg"}
                height={onBoardingImageHeight}
                width={onBoardingImageWidth}
              />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Naviga le altre liste</Text>
              <Badge color="red" variant="light">
                4
              </Badge>
            </Group>
          </Card>
        </Group>
      </ScrollArea>
    </section>
  );
};
