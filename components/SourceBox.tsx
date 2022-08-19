import { grey, grey2 } from "../colors";
import { CloseButton, createStyles, Group, Text } from "@mantine/core";
import React, { MouseEventHandler } from "react";
import { SourceSimple } from "../models/sources";
import { DefaultProps } from "@mantine/styles";

interface Props extends DefaultProps {
  source: SourceSimple | null;
  onClose: MouseEventHandler;
}
const useStyles = createStyles((theme) => ({
  boxContent: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      margin: "0 auto",
      maxWidth: 930,
    },
  },
  boxControls: {
    marginLeft: "auto",
  },
}));

export const SourceBox = ({ source, onClose }: Props) => {
  const { classes } = useStyles();
  return (
    <div
      style={{
        background: grey,
        borderBottomColor: source ? grey2 : grey,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        height: source ? "auto" : 1,
        overflow: "hidden",
        padding: source ? "14px 40px 26px" : 0,
        position: "sticky",
        left: 0,
        right: 0,
        transition: "ease",
        width: "100vw",
        maxWidth: "100vw",
      }}
    >
      <div className={classes.boxContent}>
        <Group
          position="right"
          className={classes.boxControls}
          style={{
            marginBottom: 6,
          }}
        >
          <CloseButton
            aria-label="Close modal"
            variant="transparent"
            onClick={onClose}
          />
        </Group>
        <Text>{source?.content}</Text>
        {source?.url ? (
          <Text
            size={"sm"}
            className={classes.boxControls}
            style={{
              marginTop: 30,
              textAlign: "right",
            }}
          >
            {
              <a
                href={source?.url}
                target={"_blank"}
                rel={"noreferrer"}
                style={{
                  textDecoration: "underline",
                }}
              >
                {source.title}
              </a>
            }
          </Text>
        ) : null}
      </div>
    </div>
  );
};
