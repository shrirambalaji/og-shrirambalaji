import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Inter";
                font-style: normal;
                font-weight: normal;
                src: url("/fonts/Inter-Regular.ttf") format("ttf");
              }

              @font-face {
                font-family: "Inter";
                font-weight: 300;
                src: url("/fonts/Inter-Light.ttf") format("ttf");
              }

              @font-face {
                font-family: "Inter";
                font-style: normal;
                font-weight: 600;
                src: url("/fonts/Inter-SemiBold.ttf") format("ttf");
              }

              @font-face {
                font-family: "Inter";
                font-style: normal;
                font-weight: bold;
                src: url("/fonts/Inter-Bold.ttf") format("ttf");
              }

              @font-face {
                font-family: "JetBrains Mono";
                font-style: normal;
                font-weight: normal;
                src: url("/fonts/JetBrainsMono-Regular.ttf") format("ttf");
              }

              @font-face {
                font-family: "JetBrains Mono";
                font-style: normal;
                font-weight: 600;
                src: url("/fonts/JetBrainsMono-SemiBold.ttf") format("ttf");
              }   

              @font-face {
                font-family: "JetBrains Mono";
                font-style: normal;
                font-weight: bold;
                src: url("/fonts/JetBrainsMono-Bold.ttf") format("ttf");
              }          
          `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
