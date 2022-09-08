import React from "react";
import { Paper, Text } from "@mantine/core";
import { onBoardingFontSize, useCommonStyles } from "../styles";
import { HomeSectionTitle } from "./HomeSectionTitle";
import { bluePP } from "../colors";

export const Contribute = () => {
  const {
    classes: { homeSection },
  } = useCommonStyles({});

  return (
    <Paper
      p="md"
      style={{
        background: "#EAF5FA",
        paddingTop: 30,
        paddingBottom: 60,
      }}
    >
      <section className={homeSection}>
        <HomeSectionTitle>Come contribuisco al progetto?</HomeSectionTitle>
        <Text
          style={{
            fontSize: onBoardingFontSize,
          }}
        >
          {
            "Le informazioni sono raccolte al meglio delle nostre capacità e in continuo aggiornamento, seguendo l'evoluzione della campagna elettorale."
          }
        </Text>
        <Text>
          <br />
        </Text>
        <Text
          style={{
            fontSize: onBoardingFontSize,
          }}
        >
          <strong>Manca qualcosa?</strong> Hai trovato un errore? Compila{" "}
          <a
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSe-34dHEjGaO3-8lc4JQDxdp7Yyditj9PycBL-lpARtTQPlGA/viewform"
            }
            target={"_blank"}
            rel={"noreferrer"}
            style={{
              color: bluePP,
            }}
          >
            questo form
          </a>{" "}
          anonimo. <br />
          Facci avere i tuoi suggerimenti.
        </Text>
      </section>
    </Paper>
  );
};
