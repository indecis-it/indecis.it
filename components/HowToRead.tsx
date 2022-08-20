import React from "react";
import { List, Text } from "@mantine/core";
import Image from "next/image";
import { useCommonStyles } from "../styles";
import { HomeSectionTitle } from "./HomeSectionTitle";

export const HowToRead = () => {
  const {
    classes: { homeSection },
  } = useCommonStyles({});

  return (
    <section>
      <HomeSectionTitle>Come leggere la tabella?</HomeSectionTitle>
      <Text
        className={homeSection}
        style={{
          margin: "0 auto 40px",
        }}
      >
        {/*Ogni tema puo assumere uno di questi stati: -{" "}*/}
        {/*<Image*/}
        {/*  src="/endorsement/green.svg"*/}
        {/*  alt="green"*/}
        {/*  height={20}*/}
        {/*  width={20}*/}
        {/*/>{" "}*/}
        {/*la lista si è espressa a favore del tema -{" "}*/}
        {/*<Image src="/endorsement/red.svg" alt="green" height={20} width={20} />{" "}*/}
        {/*la lista **non** si è espressa a favore del tema -{" "}*/}
        {/*{" "}*/}
      </Text>

      <List>
        <List.Item
          icon={
            <Image
              src="/endorsement/yellow.svg"
              alt="green"
              height={20}
              width={20}
            />
          }
        >
          il tema non è presente nelle fonti a nostra disposizione
        </List.Item>
      </List>
    </section>
  );
};
