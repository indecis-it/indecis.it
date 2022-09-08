import { FunctionComponent, ReactNode } from "react";
import { DefaultProps } from "@mantine/styles";
import { Title } from "@mantine/core";
import { bluePP } from "../colors";

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
      color={bluePP}
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
