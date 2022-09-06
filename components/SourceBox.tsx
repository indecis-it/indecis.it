import { grey2, grey3 } from "../colors";
import { CloseButton, createStyles, Group, Text } from "@mantine/core";
import React, { MouseEventHandler } from "react";
import { DefaultProps } from "@mantine/styles";
import { SourceSimple } from "../repositories/item";

interface Props extends DefaultProps {
  onClose: MouseEventHandler;
  source: SourceSimple | null;
}

const useStyles = createStyles((theme) => ({
  boxContent: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      margin: "0 auto",
    },
  },
  boxControls: {
    marginLeft: "auto",
  },
  boxSource: {
    position: "sticky",
    left: 40,
    maxWidth: "calc(100vw - 80px)",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      left: 60,
      paddingLeft: 140,
      maxWidth: "calc(100vw - 120px)",
    },
  },
}));

export const SourceBox = ({ className, onClose, source, style }: Props) => {
  const { classes } = useStyles();
  return (
    <div
      className={`${className} ${classes.boxContent}`}
      style={{
        ...style,
        background: grey3,
        borderBottomColor: source ? grey2 : grey3,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        height: source ? "auto" : 1,
        padding: source ? "14px 40px 26px" : 0,
        transition: "ease",
        zIndex: 200,
      }}
    >
      {source ? (
        <div className={classes.boxSource}>
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
      ) : null}
    </div>
  );
};
