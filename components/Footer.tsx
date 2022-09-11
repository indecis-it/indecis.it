import { createStyles, Group, Text, useMantineTheme } from "@mantine/core";
import { bluePP, grey3 } from "../colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { NextLink } from "@mantine/next";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  footer: {
    background: "white",
    borderTopStyle: "solid",
    borderTopWidth: 6,
    borderImageWidth: 6,
    borderColor: grey3,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingLeft: 60,
      paddingRight: 60,
      position: "fixed",
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 2000,
    },
  },
  credits: {
    display: "none",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      display: "block",
    },
  },
}));

export const Footer = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`,
    true
  );

  return (
    <footer className={classes.footer}>
      <Group position={largeScreen ? "apart" : "left"}>
        <Text size={"sm"} className={classes.credits}>
          Con il supporto di{" "}
          <a
            target={"_blank"}
            rel={"noreferrer"}
            style={{
              color: bluePP,
            }}
            href={"https://pop-eye.studio/"}
          >
            pop-eye
          </a>
        </Text>
        <Text size={"sm"}>
          <NextLink
            style={{
              textDecoration: "underline",
            }}
            href={"/"}
          >
            indecis.it
          </NextLink>{" "}
          &copy; {new Date().getFullYear()}
        </Text>
        {largeScreen ? "" : "|"}
        <Text size={"sm"}>
          Maggiori info su{" "}
          <a
            href={"https://github.com/indecis-it/indecis.it"}
            target={"_blank"}
            rel={"noreferrer"}
            style={{
              paddingLeft: 4,
            }}
          >
            <FontAwesomeIcon icon={faGithub} size={"lg"} />
          </a>
        </Text>
      </Group>
    </footer>
  );
};
