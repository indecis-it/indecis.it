import { Group, Text } from "@mantine/core";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "white",
        padding: 20,
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Group>
        <Text size={"sm"}>indecis.it – &copy; {new Date().getFullYear()}</Text>
      </Group>
    </footer>
  );
};
