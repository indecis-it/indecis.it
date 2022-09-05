import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer } from "../components/Footer";
import { Global, MantineProvider, Space } from "@mantine/core";
import Head from "next/head";

import { CustomFonts } from "../fonts";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8" />
        {/*<link rel="preconnect" href="https://fonts.googleapis.com" />*/}
        {/*<link*/}
        {/*  href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;700&display=swap"*/}
        {/*  rel="stylesheet"*/}
        {/*/>*/}
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
          styles={() => ({
            "*": {
              scrollbarWidth: "none",
            },
            "::-webkit-scrollbar": {
              background: "transparent",
              display: "none",
              height: 0,
              width: 0,
            },
            body: {
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            },
            html: {},
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
