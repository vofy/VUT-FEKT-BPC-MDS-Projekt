import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    Modal: {
      sizes: {
        xl: {
          Content: {
            w: "1900px",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChakraProvider>
);
