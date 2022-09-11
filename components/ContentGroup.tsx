import { ListData } from "../services/data";
import { Group, Modal, Text } from "@mantine/core";
import Image from "next/image";
import { ItemContent } from "./ItemContent";
import React, { useEffect, useState } from "react";
import { DefaultProps } from "@mantine/styles";
import { Item } from "../repositories/item";
import { useRouter } from "next/router";

interface Props extends DefaultProps {
  items: Item[];
}

export const ContentGroup = ({ items }: Props) => {
  const router = useRouter();
  const [, hash] = router.asPath.split("#");
  const initialSelection =
    items.find((item) => item.list.slug === hash) || ({} as Item);
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
      <Group position="center">
        {items.map((item) => {
          const { list } = item;
          const uid = `${item.id}-${item.subject_slug}-${list.id}`;
          const anchor = list.slug;
          return (
            <Group
              id={anchor}
              key={uid}
              style={{
                display: "list-item",
                listStyle: "none",
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  height: 80,
                  width: 80,
                }}
              >
                <Image
                  src={`/symbols/${list.symbol_name}`}
                  alt={list.list}
                  title={list.list}
                  width="64"
                  height="64"
                />
              </div>
              <ItemContent
                item={item}
                selected={selected.id === item.id}
                onItemSelected={onItemSelected}
              />
            </Group>
          );
        })}
      </Group>
      <Modal
        centered
        opened={!!selected.id}
        onClose={onResetSelection}
        title={selected?.list?.list}
        size={500}
        style={{
          zIndex: 3000,
        }}
      >
        <Text>{selected.source?.content}</Text>
        {selected.source?.url ? (
          <Text
            size={"sm"}
            style={{
              marginTop: 30,
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            {
              <a
                href={selected.source?.url}
                target={"_blank"}
                rel={"noreferrer"}
                style={{
                  textDecoration: "underline",
                }}
              >
                {selected.source.title}
              </a>
            }
          </Text>
        ) : null}
      </Modal>
    </>
  );
};
