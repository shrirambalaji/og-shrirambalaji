import { Html, Head, Main, NextScript } from "next/document";
import { getCss } from "./api/images";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <style>${getCss()}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
