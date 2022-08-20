import { Group, Text } from "@mantine/core";
import { grey3 } from "../colors";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "white",
        borderTopStyle: "solid",
        borderTopWidth: 6,
        borderImageWidth: 6,
        borderColor: grey3,
        // borderImage:
        //   "linear-gradient(to right, rgba(80,206,187,1) 30%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 70%, rgba(246,115,122,1) 70%) 1",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
