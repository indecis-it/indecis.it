import { FunctionComponent, ReactNode } from "react";
import { DefaultProps } from "@mantine/styles";
import { Title } from "@mantine/core";

interface Props extends DefaultProps {
  children: ReactNode;
}

export const HomeSectionTitle: FunctionComponent<Props> = ({
  children,
  className,
  style,
}) => {
  return (
    <Title
      order={3}
      className={className}
      color="#009FC4"
      style={{
        // fontFamily: "Source Serif Pro, serif",
        fontSize: 22,
        paddingTop: 30,
        paddingBottom: 30,
        ...style,
      }}
    >
      {children}
    </Title>
  );
};
