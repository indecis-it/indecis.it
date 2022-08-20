import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer } from "../components/Footer";
import { Global, MantineProvider, Space } from "@mantine/core";
import Head from "next/head";

import { CustomFonts } from "../fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8" />
      </Head>
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
        <Global
          styles={(theme) => ({
            "body::-webkit-scrollbar": {
              display: "none",
            },
            body: {
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            },
            html: {
              overflow: "overlay",
            },
          })}
        />
        <Component {...pageProps} />
        <Space
          style={{
            height: 200,
          }}
        />
        <Footer />
      </MantineProvider>
    </>
  );
}

export default MyApp;
