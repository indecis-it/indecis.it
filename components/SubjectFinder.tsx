import { createStyles, MantineSize, Select } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { DefaultProps } from "@mantine/styles";
import { SubjectSimple } from "../repositories/subject";

interface Props extends DefaultProps {
  subjects: SubjectSimple[];
  current?: SubjectSimple["slug"];
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

export const SubjectFinder = ({
  className,
  subjects,
  current,
  size,
  style,
}: Props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const navigate = (value: SubjectSimple["slug"]) =>
    router.push(`/argomenti/${value}`);
  const selectData = subjects.map(({ subject, slug }) => ({
    label: subject,
    value: slug,
  }));
  return (
    <Select
      dropdownPosition="bottom"
      searchable
      className={`${className} ${classes.select}`}
      data={selectData}
      label=""
      placeholder="(ad es., Flat Tax)"
      value={current}
      size={size}
      style={{
        ...style,
      }}
      onChange={navigate}
    />
  );
};
