import { Group, Text } from "@mantine/core";
import { grey3 } from "../colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "white",
        borderTopStyle: "solid",
        borderTopWidth: 6,
        borderImageWidth: 6,
        borderColor: grey3,
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 2000,
      }}
    >
      <Group position="apart">
        <Text size={"sm"}>
          Con il supporto di{" "}
          <a
            target={"_blank"}
            rel={"noreferrer"}
            style={{
              color: "#009FC4",
            }}
            href={"https://pop-eye.studio/"}
          >
            Popeye Studio
          </a>
        </Text>
        <Text size={"sm"}>
          <Link
            style={{
              textDecoration: "underline",
            }}
            href={"/"}
          >
            indecis.it
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </Text>
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
