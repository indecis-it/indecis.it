import { createStyles } from "@mantine/core";
import { ListData } from "./services/data";
import { Item } from "./repositories/item";

interface StylesParams {
  list: ListData[] | Item[];
}

export const useCommonStyles = createStyles(
  (theme, { list }: StylesParams) => ({
    scrollingWidth: {
      width: 90 * (list.length + 1) + 140,
      maxWidth: 1290,
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        margin: "0 auto",
        maxWidth: "none",
      },
    },
  })
);
