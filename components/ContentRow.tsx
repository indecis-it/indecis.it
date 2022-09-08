import { createStyles, Group } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { bluePP, grey3 } from "../colors";
import { SourceBox } from "./SourceBox";
import { Item, SourceSimple } from "../repositories/item";
import { rowMinHeight, useCommonStyles } from "../styles";
import { ItemContent } from "./ItemContent";
import { NextLink } from "@mantine/next";

interface Props extends DefaultProps {
  initialOpen?: boolean;
  items: Item[];
  subjectSlug: string;
  subjectTitle: string;
}

const useStyles = createStyles((theme) => ({
  row: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      "&:hover": {
        backgroundColor: theme.fn.lighten(grey3, 0.5),
      },
    },
  },
  rowContent: {
    background: "white",
    minHeight: rowMinHeight,
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
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      "&:hover": {
        backgroundColor: theme.fn.lighten(grey3, 0.5),
      },
    },
  },
  subjectLink: {
    color: bluePP,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

export const ContentRow = ({
  initialOpen = false,
  items,
  subjectSlug,
  subjectTitle,
  style,
}: Props) => {
  const {
    classes: { scrollingWidth },
  } = useCommonStyles({ list: items });
  const { classes } = useStyles();
  const initialSelection = initialOpen ? items[0] : ({} as Item);
  const [selected, setSelected] = useState<Item>(initialSelection);

  const onItemSelected = (item: Item) => {
    if (selected.id === item.id) {
      return onResetSelection();
    }
    setSelected(item);
  };

  const onResetSelection = () => {
    setSelected({} as Item);
  };

  return (
    <>
      <Group className={`${scrollingWidth} ${classes.row}`}>
        <div
          className={classes.rowContent}
          style={{
            ...style,
          }}
        >
          <NextLink
            href={`/argomenti/${subjectSlug}`}
            className={classes.subjectLink}
          >
            {subjectTitle}
          </NextLink>
        </div>
        {items.map((item) => {
          const { list_id, subject_slug } = item;
          const uid = `${subject_slug}-${list_id}`;
          return (
            <ItemContent
              key={uid}
              item={item}
              selected={selected.id === item.id}
              onItemSelected={onItemSelected}
            />
          );
        })}
      </Group>
      <SourceBox
        className={scrollingWidth}
        source={selected.source}
        onClose={onResetSelection}
      />
    </>
  );
};
