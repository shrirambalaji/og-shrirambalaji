import slugify from "@sindresorhus/slugify";
import { IncomingMessage, ServerResponse } from "http";
import type { ScreenShotFileType } from "./_lib/_playwright";
import { getScreenshot } from "./_lib/_playwright";

const isDev = !process.env.AWS_REGION;
const HOST = isDev ? "http://localhost:3000" : "https://shrirambalaji.com";
const DEFAULT_TITLE = "Hello World!";

interface OgSearchParams extends URLSearchParams {
  title?: string;
  fileType?: ScreenShotFileType;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const url = new URL(req.url as string, HOST);
    const params: OgSearchParams = url.searchParams;
    const fileType =
      (params.get("fileType") as unknown as ScreenShotFileType) ?? "png";
    const title = params.get("title") ?? DEFAULT_TITLE;
    const queryString = params.toString();
    const screenshotUrl = `${HOST}?${queryString}`;
    const file = await getScreenshot(screenshotUrl, fileType);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.setHeader(
      "Content-Disposition", `filename="${slugify(title)}.${fileType}"`
    );
    res.end(file);
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
