import { Grid } from "@mantine/core";
import Image from "next/image";
import { Party } from "../pages/models/parties";

interface Props {
  lists: Party[];
}

export const ContentsHeader = ({ lists }: Props) => {
  const symbols = lists.filter(({ symbol_name }) => !!symbol_name);
  return (
    <Grid
      sx={{
        paddingTop: 10,
      }}
    >
      {symbols.map(({ id, list, symbol_name }) => (
        <Grid.Col
          key={id}
          span={12 / symbols.length}
          sx={{
            textAlign: "center",
            height: 80,
            width: 80,
            maxWidth: 80,
          }}
        >
          <Image
            src={`/symbols/${symbol_name}`}
            alt={list}
            width="64"
            height="64"
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
