import { Button, Group, Modal, Select } from "@mantine/core";
import React, { useState } from "react";
import { Category } from "../models/categories";
import { useRouter } from "next/router";

interface Props {
  categories: Category[];
  current: Category;
}

export const CategorySelect = ({ categories, current }: Props) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const navigate = (value: string) => router.push(value);
  const selectData = categories.map(({ name_it, slug }) => ({
    label: name_it,
    value: slug,
  }));
  return (
    <>
      <Group
        position="center"
        style={{
          padding: 20,
          paddingTop: 30,
        }}
      >
        <Select
          data={selectData}
          label=""
          placeholder="Seleziona un argomento"
          value={current.slug}
          style={{
            minWidth: 230,
          }}
          onChange={navigate}
        />
        <Button variant="outline" onClick={() => setOpened(true)}>
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
