import { Button, Group, Modal } from "@mantine/core";
import React, { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { DefaultProps } from "@mantine/styles";
import { CategoryData } from "../services/data";

interface Props extends DefaultProps {
  categories: CategoryData[];
  current: CategoryData;
}

export const CategorySelection = ({
  categories,
  className,
  current,
  style,
}: Props) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Group
        position="center"
        className={className}
        style={{
          ...style,
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
