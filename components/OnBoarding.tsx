import { Badge, Card, Group, ScrollArea, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useCommonStyles } from "../styles";
import { HomeSectionTitle } from "./HomeSectionTitle";

const onBoardingImageWidth = 250;
const onBoardingImageHeight = 400;

export const OnBoarding = () => {
  const {
    classes: { homeSection },
  } = useCommonStyles({});

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
          paddingLeft: 30,
          width: "100%",
        }}
      >
        <Group
          style={{
            width: onBoardingImageWidth * 5,
          }}
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
