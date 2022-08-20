import { createStyles, NativeSelect } from "@mantine/core";
import React, { ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import { DefaultProps } from "@mantine/styles";
import { CategoryData } from "../services/data";

interface Props extends DefaultProps {
  categories: CategoryData[];
  current?: CategoryData["slug"];
}

const useStyles = createStyles((theme) => ({
  select: {
    minWidth: 230,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      minWidth: 400,
    },
  },
}));

export const CategorySelector = ({ categories, current, style }: Props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const navigate: ChangeEventHandler<HTMLSelectElement> = (event) =>
    router.push(`/items/${event.currentTarget.value}`);
  const selectData = categories.map(({ name_it, slug }) => ({
    label: name_it,
    value: slug,
  }));
  return (
    <NativeSelect
      data={selectData}
      label=""
      placeholder="Seleziona un argomento"
      value={current}
      className={classes.select}
      style={{
        ...style,
      }}
      onChange={navigate}
    />
  );
};
