import { Group } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { DefaultProps } from "@mantine/styles";
import { ListData } from "../services/data";

interface Props extends DefaultProps {
  lists: ListData[];
}

export const ContentsHeader = ({ lists, style }: Props) => {
  const symbols = lists.filter(({ symbol_name }) => !!symbol_name);
  return (
    <Group
      style={{
        ...style,
        margin: "0 auto",
        paddingTop: 10,
        width: 90 * (lists.length + 1) + 140,
        maxWidth: 1290,
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
          zIndex: 100,
        }}
      />
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
