import "../styles/globals.css";
import * as React from "react";
import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";
import { BaseRtlProvider } from "../src/components/base/base-rtl-provider";
import "../styles/globals.css";

function MyApp(props: any) {
  const { Component, pageProps, lang } = props;

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BaseRtlProvider lang={lang}>
        <Component {...pageProps} />
      </BaseRtlProvider>
    </ThemeProvider>
  );
}

export default MyApp;
