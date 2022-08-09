import type { NextPage } from "next";
import { MantineProvider } from "@mantine/core";

const Home: NextPage = () => {
  return (
    <>
      <MantineProvider>
        <div></div>
      </MantineProvider>
    </>
  );
};

export default Home;
export async function getStaticProps(context: never) {
  return {
    props: {},
  };
}
