import { createGetInitialProps } from "@mantine/next";
import Document from "next/document";
const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
	static getInitialProps = getInitialProps;
}

export default MyDocument;
