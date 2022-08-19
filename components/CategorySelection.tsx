import { Button, Group, Modal } from "@mantine/core";
import React, { useState } from "react";
import { Category } from "../models/categories";
import { CategorySelector } from "./CategorySelector";
import { DefaultProps } from "@mantine/styles";

interface Props extends DefaultProps {
  categories: Category[];
  current: Category;
}

export const CategorySelection = ({ categories, current }: Props) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Group
        position="center"
        style={{
          padding: 20,
          paddingTop: 30,
        }}
      >
        <CategorySelector categories={categories} current={current.slug} />
        <Button onClick={() => setOpened(true)} color="indigo-green">
          Cosa è?
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={current.name_it}
      >
        {current.description_it}
      </Modal>
    </>
  );
};
