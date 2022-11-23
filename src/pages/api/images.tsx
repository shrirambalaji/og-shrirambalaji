import { ImageResponse } from "@vercel/og";
import { IncomingMessage, ServerResponse } from "http";
import { NextRequest } from "next/server";
import OgImage from "../../components/OgImage";
const isDev = !process.env.AWS_REGION;
const HOST = isDev ? "http://localhost:3001" : process.env.VERCEL_HOST;

export const config = {
  runtime: "experimental-edge",
};

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
export default async function handler(req: NextRequest) {
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
      status: 200,
      debug: true,
    });
    return response;
  } catch (e: any) {
    console.error(e);
    const myOptions = { status: 500, statusText: e.message };
    return new Response('Failed to generate image', myOptions);
  }
}
