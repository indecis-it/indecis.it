import { grey3 } from "../colors";
import Image from "next/image";
import React from "react";
import { DefaultProps } from "@mantine/styles";
import { Item } from "../repositories/item";
import { createStyles } from "@mantine/core";
import { rowMinHeight } from "../styles";

interface Props extends DefaultProps {
  item: Item;
  selected: boolean;
  onItemSelected?: (item: Item) => void;
}

const useStyles = createStyles((theme) => ({
  row: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      "&:hover": {
        backgroundColor: theme.fn.lighten(grey3, 0.5),
      },
    },
  },
  item: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      "&:hover": {
        backgroundColor: `${grey3} !important`,
      },
    },
  },
}));

export const ItemContent = ({
  item,
  onItemSelected = () => {},
  selected,
}: Props) => {
  const { classes } = useStyles();
  return (
    <div
      style={{
        background: selected ? grey3 : "inherit",
        cursor: !item.empty ? "pointer" : "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: rowMinHeight,
        width: 80,
      }}
      className={classes.item}
      onClick={() => onItemSelected(item)}
    >
      {!item.empty ? (
        <Image
          src={`/endorsement/${item.endorsement?.icon}.svg`}
          alt={item.endorsement?.description}
          title={item.endorsement?.description}
          height={20}
          width={20}
        ></Image>
      ) : null}
    </div>
  );
};
