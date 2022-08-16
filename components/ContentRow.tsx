import { CloseButton, Grid, Group } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { Content } from "../models/contents";

interface Props extends DefaultProps {
  contents: Content[];
  item: string;
}

export const ContentRow = ({ contents, item }: Props) => {
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(-1);

  const onItemSelected = ({ id, description }: Content) => {
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
                background: selected === id ? "#F2F0F0" : "white",
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
          background: "#F2F0F0",
          height: message ? "auto" : 1,
          // margin: "8px 0",
          overflow: "hidden",
          padding: message ? "14px 22px" : 0,
          position: "sticky",
          left: 0,
          right: 0,
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
