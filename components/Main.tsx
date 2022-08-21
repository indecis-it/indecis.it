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
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Con{" "}
          <h1
            style={{
              fontSize: "inherit",
              display: "inline",
            }}
          >
            indecis.it
          </h1>{" "}
          confronti i programmi elettorali per le elezioni politiche del 25
          settembre 2022. In maniera facile e intuitiva.
        </Text>
      </header>
      <OnBoarding />
      <HowToRead />
    </main>
  );
};
