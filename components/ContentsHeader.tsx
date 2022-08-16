import { Group } from "@mantine/core";
import Image from "next/image";
import { Party } from "../models/parties";
import React from "react";
import { DefaultProps } from "@mantine/styles";

interface Props extends DefaultProps {
  lists: Party[];
}

export const ContentsHeader = ({ lists }: Props) => {
  const symbols = lists.filter(({ symbol_name }) => !!symbol_name);
  return (
    <Group
      style={{
        paddingTop: 10,
        width: 90 * lists.length + 140,
      }}
    >
      <div
        style={{
          width: 140,
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
