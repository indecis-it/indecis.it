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
      <List
        className={homeSection}
        style={{
          margin: "0 auto 40px",
        }}
      >
        <List.Item
          icon={
            <Image
              src="/endorsement/green.svg"
              alt="green"
              height={20}
              width={20}
            />
          }
        >
          il tema non è presente nelle fonti a nostra disposizione
        </List.Item>
        <List.Item
          icon={
            <Image
              src="/endorsement/red.svg"
              alt="green"
              height={20}
              width={20}
            />
          }
        >
          il tema non è presente nelle fonti a nostra disposizione
        </List.Item>
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
