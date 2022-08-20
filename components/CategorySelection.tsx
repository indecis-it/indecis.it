import { Button, Group, MantineSize, Modal } from "@mantine/core";
import React, { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { DefaultProps } from "@mantine/styles";
import { CategoryData } from "../services/data";

interface Props extends DefaultProps {
  categories: CategoryData[];
  current: CategoryData;
  size?: MantineSize;
}

export const CategorySelection = ({
  categories,
  className,
  current,
  size = "sm",
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
          paddingTop: 30,
        }}
      >
        <CategorySelector
          categories={categories}
          current={current.slug}
          size={size}
        />
        <Button
          onClick={() => setOpened(true)}
          color="indigo-green"
          size={size}
        >
          Cosa è?
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={current.name_it}
        style={{
          zIndex: 3000,
        }}
      >
        {current.description_it}
      </Modal>
    </>
  );
};
