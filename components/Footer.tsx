import { Group, Text } from "@mantine/core";
import { grey3 } from "../colors";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "white",
        borderTopColor: grey3,
        borderTopStyle: "solid",
        borderTopWidth: 40,
        padding: 20,
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 200,
      }}
    >
      <Group>
        <Text size={"sm"}>indecis.it – &copy; {new Date().getFullYear()}</Text>
      </Group>
    </footer>
  );
};
