import React from "react";
import { createStyles, List, Text } from "@mantine/core";
import Image from "next/image";
import { onBoardingFontSize, useCommonStyles } from "../styles";
import { HomeSectionTitle } from "./HomeSectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Contribute = () => {
  const {
    classes: { homeSection },
  } = useCommonStyles({});

  return (
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
        Manca qualcosa? Hai trovato un errore? Compila{" "}
        <a
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSe-34dHEjGaO3-8lc4JQDxdp7Yyditj9PycBL-lpARtTQPlGA/viewform"
          }
          target={"_blank"}
          rel={"noreferrer"}
          style={{
            textDecoration: "underline",
          }}
        >
          questo form
        </a>{" "}
        (anonimo). Facci avere i tuoi suggerimenti.
      </Text>
    </section>
  );
};
