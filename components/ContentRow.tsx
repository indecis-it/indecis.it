import { Group } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { grey } from "../colors";
import Image from "next/image";
import { SourceBox } from "./SourceBox";
import { Item, SourceSimple } from "../repositories/item";

interface Props extends DefaultProps {
  initialOpen?: boolean;
  items: Item[];
  topic: string;
}

export const ContentRow = ({
  initialOpen = false,
  items,
  topic,
  style,
}: Props) => {
  const initialSource = initialOpen ? items[0].source : null;
  const initialSelection = initialOpen ? items[0].id : -1;
  const [source, setSource] = useState<SourceSimple | null>(initialSource);
  const [selected, setSelected] = useState<number>(initialSelection);

  const onItemSelected = ({ id, source }: Item) => {
    if (selected === id) {
      return onResetSelection();
    }
    setSelected(id);
    setSource(source);
  };

  const onResetSelection = () => {
    setSource(null);
    setSelected(-1);
  };

  return (
    <>
      <Group
        style={{
          margin: "0 auto",
          maxWidth: 1290,
        }}
      >
        <div
          style={{
            ...style,
            background: "white",
            boxShadow:
              selected === -1
                ? "white 16px 0px 9px -9px"
                : "white 11px 2px 8px",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            lineHeight: "18px",
            paddingTop: 0,
            paddingRight: 20,
            paddingBottom: 0,
            paddingLeft: 20,
            position: "sticky",
            left: 0,
            right: 0,
            width: 160,
            zIndex: 100,
          }}
        >
          {topic}
        </div>
        {items.map((item) => {
          const { id, endorsement } = item;
          return (
            <div
              key={id}
              style={{
                background: selected === id ? grey : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                maxWidth: 80,
                minWidth: 80,
              }}
              onClick={() => onItemSelected(item)}
            >
              <Image
                src={`/endorsement/${endorsement?.icon}.svg`}
                alt={`La lista è ${endorsement?.description}`}
                title={`La lista è ${endorsement?.description}`}
                height={20}
                width={20}
              ></Image>
            </div>
          );
        })}
      </Group>
      <SourceBox source={source} onClose={onResetSelection} />
    </>
  );
};
