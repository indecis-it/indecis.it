import { Accordion, Grid } from "@mantine/core";
import { Items } from "../pages/models/items";
import { ItemNames } from "../pages/models/contents";

interface Props {
  names: ItemNames;
  items: Items;
}

export const ContentsList = ({ names, items }: Props) => {
  return Object.keys(items).map((slug) => (
    <>
      <div>{names[slug].item} </div>
      <Grid
        sx={{
          paddingTop: 10,
        }}
      >
        {items[slug].map(
          ({ id, item, endorsement, description, source_title }) => (
            <Grid.Col
              key={id}
              span={12 / items[slug].length}
              sx={{
                textAlign: "center",
                // height: 80,
                // width: 80,
                // maxWidth: 80,
              }}
            >
              <Accordion>
                <Accordion.Item value={endorsement}>
                  <Accordion.Control>🟢</Accordion.Control>
                  <Accordion.Panel>{description}</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>
          )
        )}
      </Grid>
    </>
  ));
};
