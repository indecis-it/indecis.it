import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer } from "../components/Footer";
import { MantineProvider } from "@mantine/core";

import { CustomFonts } from "../fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colors: {
          "indigo-green": [
            "#defcf8",
            "#bcf0e9",
            "#97e4d8",
            "#72d8c9",
            "#4ccdb9",
            "#32b3a0",
            "#50CEBB",
            "#146559",
            "#033d35",
            "#001713",
          ],
          "lobster-red": [
            "#ffe4e6",
            "#fdb6ba",
            "#f7878d",
            "#f35860",
            "#ef2b33",
            "#d7151b",
            "#F6737A",
            "#78080e",
            "#490306",
            "#1e0000",
          ],
        },
        colorScheme: "light",
        black: "#363636",
        fontFamily: "Raleway, sans-serif",
      }}
    >
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  );
}

export default MyApp;
