import { CloseButton, Group, Text } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { grey, grey2 } from "../colors";
import { Item } from "../models/items";
import Image from "next/image";
import { SourceSimple } from "../models/sources";
import { SourceBox } from "./SourceBox";

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
      <Group>
        <div
          style={{
            ...style,
            background: "white",
            boxShadow: "white 10px 0px 15px",
            minHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            lineHeight: "18px",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            position: "sticky",
            left: 0,
            right: 0,
            width: 140,
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
