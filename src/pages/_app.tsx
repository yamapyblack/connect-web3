import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "../app/store";

//Chakra
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

import Blockchain from "../features/blockchain/Blockchain";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Blockchain />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
