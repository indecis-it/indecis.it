import Image from "next/image";
import { createStyles, Group, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { DefaultProps } from "@mantine/styles";
import { useMediaQuery } from "@mantine/hooks";
import { NextLink } from "@mantine/next";

interface Props extends DefaultProps {}

const useStyles = createStyles((theme) => ({
  collaboration: {
    alignItems: "self-end",
    flexDirection: "column",
    gap: 0,
	height: 55,
	[`@media (min-width: ${theme.breakpoints.md}px)`]: {
		height: 75,
	},
  },
  headerGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    lineHeight: "10px",
    position: "sticky",
    left: 40,
    width: "calc(100vw - 80px)",
  },
  logo: {
    height: 90,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      margin: "0 auto",
      position: "relative",
      left: 80,
      height: 150
    },
  },
}));

export const MainHeader = ({ className, style }: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`,
    true
  );
  return (
    <header
      className={className}
      style={{
        ...style,
        display: "flex",
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        textAlign: "center",
      }}
    >
      <hgroup className={classes.headerGroup}>
        <h1 className={classes.logo}>
          <NextLink href="/">
            <Image
              src={`/indecis-it-logo-diff.svg`}
              alt="Il logo di indecis.it"
              height={largeScreen ? 150 : 90}
              width={largeScreen ? 150 : 90}
            />
          </NextLink>
        </h1>
        <Group className={classes.collaboration}>
          <Text align="center" size={"sm"}>
            in collaborazione con
          </Text>
          { /* eslint-disable react/jsx-no-target-blank */ }
          <a href="https://pagellapolitica.it/" target="_blank" rel="noopener">
            <Image
              src={`/pagella_politica_logo.svg`}
              alt="Il logo di indecis.it"
              height={largeScreen ? 50 : 30}
              width={largeScreen ? 100 : 80}
            />
          </a>
        </Group>
      </hgroup>
    </header>
  );
};
