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
        Con{" "}
        <h1
          style={{
            fontSize: 16,
            display: "inline",
          }}
        >
          indecis.it
        </h1>{" "}
        confronti i programmi elettorali per le elezioni politiche del 25
        settembre 2022. In maniera facile e intuitiva.
      </header>
      <OnBoarding />
      <HowToRead />
    </main>
  );
};
