import { Text } from "@mantine/core";
import { OnBoarding } from "./OnBoarding";
import React from "react";
import { HowToRead } from "./HowToRead";
import { onBoardingFontSize, useCommonStyles } from "../styles";
import { Contribute } from "./Contribute";

export const Main = () => {
  const {
    classes: { homeSection, main },
  } = useCommonStyles({});

  return (
    <main
      className={main}
      style={{
        margin: "20px auto",
      }}
    >
      <header
        className={homeSection}
        style={{
          margin: "0 auto",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontSize: onBoardingFontSize,
          }}
        >
          <strong>Arrivi al 25 settembre 2022 con le idee chiare.</strong>{" "}
          <br />
          <h1
            style={{
              display: "inline",
              fontSize: "inherit",
              fontWeight: "normal",
            }}
          >
            indecis.it
          </h1>{" "}
          è uno strumento facile e intuitivo per un voto consapevole.
        </Text>
      </header>
      <OnBoarding />
      <HowToRead />
      <Contribute />
    </main>
  );
};
