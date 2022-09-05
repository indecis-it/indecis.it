import { createStyles, MantineSize, NativeSelect } from "@mantine/core";
import React, { ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import { DefaultProps } from "@mantine/styles";
import { CategorySimple } from "../models/categories";

interface Props extends DefaultProps {
  categories: CategorySimple[];
  current?: CategorySimple["slug"];
  size?: MantineSize;
}

const useStyles = createStyles((theme) => ({
  select: {
    minWidth: 230,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      minWidth: 400,
    },
  },
}));

export const CategorySelector = ({
  categories,
  current,
  size,
  style,
}: Props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const navigate: ChangeEventHandler<HTMLSelectElement> = (event) =>
    router.push(`/tematica/${event.currentTarget.value}`);
  const selectData = categories.map(({ name, slug }) => ({
    label: name,
    value: slug,
  }));
  return (
    <NativeSelect
      className={classes.select}
      // @ts-ignore
      data={selectData}
      label=""
      placeholder="Scegli la tematica"
      // @ts-ignore
      value={current}
      size={size}
      style={{
        ...style,
      }}
      onChange={navigate}
    />
  );
};
