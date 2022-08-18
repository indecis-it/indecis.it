import { Select } from "@mantine/core";
import React from "react";
import { Category } from "../models/categories";
import { useRouter } from "next/router";
import { DefaultProps } from "@mantine/styles";

interface Props extends DefaultProps {
  categories: Category[];
  current?: Category["slug"];
}

export const CategorySelector = ({ categories, current, style }: Props) => {
  const router = useRouter();
  const navigate = (value: string) => router.push(`/content/${value}`);
  const selectData = categories.map(({ name_it, slug }) => ({
    label: name_it,
    value: slug,
  }));
  return (
    <Select
      data={selectData}
      label=""
      placeholder="Seleziona un argomento"
      value={current}
      style={{
        ...style,
        minWidth: 230,
      }}
      onChange={navigate}
    />
  );
};
