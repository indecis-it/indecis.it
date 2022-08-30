import { Text } from "@mantine/core";
import { OnBoarding } from "./OnBoarding";
import React from "react";
import { HowToRead } from "./HowToRead";
import { useCommonStyles } from "../styles";

export const Main = () => {
  const {
    classes: { main },
  } = useCommonStyles({});

  return (
    <main
      className={main}
      style={{
        margin: "20px auto",
      }}
    >
      <header
        style={{
          margin: "0 auto",
          padding: 30,
          // textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Arrivi al 25 settembre 2022 con le idee chiare.{" "}
          <h1
            style={{
              fontSize: "inherit",
              display: "inline",
            }}
          >
            indecis.it
          </h1>{" "}
          è uno strumento facile e intuitivo per un voto consapevole.
        </Text>
      </header>
      <OnBoarding />
      <HowToRead />
    </main>
  );
};
