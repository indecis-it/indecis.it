import { CloseButton, Group } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { grey, grey2 } from "../colors";
import { Item } from "../models/items";

interface Props extends DefaultProps {
  contents: Item[];
  item: string;
}

export const ContentRow = ({ contents, item }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [selected, setSelected] = useState<number>(-1);

  const onItemSelected = ({ id, description }: Item) => {
    setMessage(description);
    setSelected(id);
  };

  const onResetSelection = () => {
    setMessage("");
    setSelected(-1);
  };

  return (
    <>
      <Group spacing="xs">
        <div
          style={{
            background: "white",
            minHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            lineHeight: "18px",
            padding: "0 20px",
            position: "sticky",
            left: 0,
            right: 0,
            width: 140,
          }}
        >
          {item}
        </div>
        {contents.map((content) => {
          const { id, endorsement } = content;
          return (
            <div
              key={id}
              style={{
                background: selected === id ? grey : "white",
                display: "flex",
                alignItems: "center",
                height: 60,
                maxWidth: 80,
                minWidth: 80,
              }}
            >
              <div
                onClick={() => onItemSelected(content)}
                style={{
                  background: endorsement,
                  borderRadius: "100%",
                  height: 20,
                  margin: "0 auto",
                  width: 20,
                }}
              ></div>
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
          padding: message ? "14px 22px" : 0,
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
