import { Global } from "@mantine/core";
// @ts-ignore
import extraBold from "./Raleway-ExtraBold.ttf";
// @ts-ignore
import medium from "./Raleway-Medium.ttf";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Raleway",
            src: `url('${extraBold}') format("ttf")`,
            fontWeight: 800,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Raleway",
            src: `url('${medium}') format("ttf")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
