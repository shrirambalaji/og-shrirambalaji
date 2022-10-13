import { ImageResponse } from "@vercel/og";
import { IncomingMessage, ServerResponse } from "http";
import { NextRequest } from "next/server";
import OgImage from "../../components/OgImage";
const isDev = !process.env.AWS_REGION;
const HOST = isDev ? "http://localhost:3001" : process.env.VERCEL_HOST;

export interface OgSearchParams {
  title?: string;
  backgroundImageURL?: string;
  backgroundOverlayOpacity?: string;
  blur?: string;
  center?: string;
  date?: string;
  highlight?: string;
  subtitle?: string;
  hideUsername?: string;
}

// FIXME:  TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".wasm"
export default async function handler(
  req: NextRequest,
  res: ServerResponse
) {
  try {
    const url = new URL(req.url as string, HOST);
    const params: OgSearchParams = Object.fromEntries(
      url.searchParams.entries()
    );
    const image = <OgImage {...params} />;
    const response = new ImageResponse(image, {
      width: 1200,
      height: 630,
      emoji: "fluent",
    });
    return response;
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<div style='display: grid; place-content: center; height: 100vh; font-family: system-ui;'>
          <h1 style='font-weight: 300;'> 
            <strong>${res.statusCode}</strong>&nbsp;&nbsp;|&nbsp;&nbsp;<span>Sorry, there was an unexpected error.</span> 
          </h1> 
        </div>`
    );
    console.error(e);
  } finally {
    console.log(`HTTP ${res.statusCode} ${req.url}`);
  }
}
