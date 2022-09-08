import { createStyles, Group, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { DefaultProps } from "@mantine/styles";
import { ListData } from "../services/data";
import { useCommonStyles } from "../styles";

interface Props extends DefaultProps {
  lists: ListData[];
}

const useStyles = createStyles((theme) => ({
  swipe: {
    fontSize: 12,
    marginTop: 25,
    paddingLeft: 20,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
}));

export const ContentsHeader = ({ lists, style }: Props) => {
  const {
    classes: { scrollingWidth },
  } = useCommonStyles({ list: lists });
  const { classes } = useStyles();
  const symbols = lists.filter(({ symbol_name }) => !!symbol_name);
  return (
    <Group
      className={scrollingWidth}
      style={{
        ...style,
        background: "white",
        margin: "0 auto",
        paddingTop: 10,
      }}
    >
      <div
        style={{
          background: "white",
          boxShadow: "white 10px 0px 15px",
          minHeight: 80,
          position: "sticky",
          left: 0,
          right: 0,
          width: 160,
          zIndex: 200,
        }}
      >
        <Group className={classes.swipe}>
          <Text>{"Scorri le liste >>"}</Text>
          {/*<Image*/}
          {/*  src="/swipe.png"*/}
          {/*  alt="Scorri le liste"*/}
          {/*  title="Scorri le liste"*/}
          {/*  width="20"*/}
          {/*  height="20"*/}
          {/*/>*/}
        </Group>
      </div>
      {symbols.map(({ id, list, symbol_name }) => (
        <div
          key={id}
          style={{
            textAlign: "center",
            height: 80,
            maxWidth: 80,
            minWidth: 80,
          }}
        >
          <Image
            src={`/symbols/${symbol_name}`}
            alt={list}
            title={list}
            width="64"
            height="64"
          />
        </div>
      ))}
    </Group>
  );
};
