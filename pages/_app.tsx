import { AppProps } from "next/dist/shared/lib/router/router";
import React, { useEffect } from "react";
import "../styles/global.less";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const html = document.querySelector("html")!;
    html.dataset.theme = "light";
  }, []);
  return <Component {...pageProps} />;
}
