import { createStyles, Group } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import React, { useState } from "react";
import { grey, grey3 } from "../colors";
import Image from "next/image";
import { SourceBox } from "./SourceBox";
import { Item, SourceSimple } from "../repositories/item";
import { useCommonStyles } from "../styles";

interface Props extends DefaultProps {
  initialOpen?: boolean;
  items: Item[];
  topic: string;
}

const useStyles = createStyles((theme) => ({
  row: {
    "&:hover": {
      backgroundColor: theme.fn.lighten(grey3, 0.5),
    },
  },
  item: {
    "&:hover": {
      backgroundColor: `${grey3} !important`,
    },
  },
}));

export const ContentRow = ({
  initialOpen = false,
  items,
  topic,
  style,
}: Props) => {
  const {
    classes: { scrollingWidth },
  } = useCommonStyles({ list: items });
  const initialSource = initialOpen ? items[0].source : null;
  const initialSelection = initialOpen ? items[0].uid : -1;
  const [source, setSource] = useState<SourceSimple | null>(initialSource);
  const [selected, setSelected] = useState<Item["uid"]>(initialSelection);

  const onItemSelected = ({ uid, source }: Item) => {
    if (selected === uid) {
      return onResetSelection();
    }
    setSelected(uid);
    setSource(source);
  };

  const onResetSelection = () => {
    setSource(null);
    setSelected(-1);
  };

  const { classes } = useStyles();

  return (
    <>
      <Group className={`${scrollingWidth} ${classes.row}`}>
        <div
          style={{
            ...style,
            // background: "white",
            // boxShadow:
            //   selected === -1
            //     ? "white 16px 0px 9px -9px"
            //     : "white 11px 2px 8px",
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
          const { empty, endorsement, list_id, subject_slug } = item;
          const uid = `${subject_slug}-${list_id}`;
          return (
            <div
              key={uid}
              style={{
                background: selected === uid ? grey3 : "inherit",
                cursor: !empty ? "pointer" : "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                maxWidth: 80,
                minWidth: 80,
              }}
              className={classes.item}
              onClick={() => onItemSelected(item)}
            >
              {!empty ? (
                <Image
                  src={`/endorsement/${endorsement?.icon}.svg`}
                  alt={endorsement?.description}
                  title={endorsement?.description}
                  height={20}
                  width={20}
                ></Image>
              ) : null}
            </div>
          );
        })}
      </Group>
      <SourceBox
        className={scrollingWidth}
        source={source}
        onClose={onResetSelection}
      />
    </>
  );
};
