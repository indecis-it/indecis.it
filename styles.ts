import { createStyles } from "@mantine/core";
import { ListData } from "./services/data";
import { Item } from "./repositories/item";

interface StylesParams {
  list?: ListData[] | Item[];
}

export const onBoardingImageWidth = 284;
export const onBoardingImageHeight = 274;
export const onBoardingFontSize = 20;
export const rowMinHeight = 90;

export const useCommonStyles = createStyles(
  (theme, { list = [] }: StylesParams) => ({
    scrollingWidth: {
      width: 92 * (list.length + 1) + 140,
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        margin: "0 auto",
      },
    },
    homeSection: {
      margin: "0 auto",
      padding: "0 30px",
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        maxWidth: "70%",
      },
    },
    main: {
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        margin: "0 auto",
        maxWidth: 1250,
      },
    },
  })
);
