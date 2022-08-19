import { CloseButton, Group } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { grey, grey2 } from "../colors";
import { Item } from "../models/items";
import Image from "next/image";

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
  const initialMessage = initialOpen ? items[0].description : "";
  const initialSelection = initialOpen ? items[0].id : -1;
  const [message, setMessage] = useState<string>(initialMessage);
  const [selected, setSelected] = useState<number>(initialSelection);

  const onItemSelected = ({ id, description }: Item) => {
    if (selected === id) {
      return onResetSelection();
    }
    setSelected(id);
    setMessage(description);
  };

  const onResetSelection = () => {
    setMessage("");
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
        {items.map((content) => {
          const { id, endorsement } = content;
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
              onClick={() => onItemSelected(content)}
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
      <div
        style={{
          background: grey,
          borderBottomColor: message ? grey2 : grey,
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          height: message ? "auto" : 1,
          // margin: "8px 0",
          overflow: "hidden",
          padding: message ? "14px 22px 26px" : 0,
          position: "sticky",
          left: 0,
          right: 0,
          transition: "ease",
          width: "100vw",
          maxWidth: "100vw",
        }}
      >
        <Group
          position="right"
          style={{
            marginBottom: 6,
          }}
        >
          <CloseButton
            aria-label="Close modal"
            variant="transparent"
            onClick={onResetSelection}
          />
        </Group>
        {message}
      </div>
    </>
  );
};
