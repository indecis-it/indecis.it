import { FunctionComponent, ReactNode } from "react";
import { DefaultProps } from "@mantine/styles";

interface Props extends DefaultProps {
  children: ReactNode;
}

export const HomeSectionTitle: FunctionComponent<Props> = ({
  children,
  className,
}) => {
  return (
    <h3
      className={className}
      style={{
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      {children}
    </h3>
  );
};
