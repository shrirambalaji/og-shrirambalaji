import chrome from "chrome-aws-lambda";
import puppeteer, { ScreenshotOptions } from "puppeteer-core";
const isProd = !!process.env.AWS_REGION;

export async function getScreenshot(
  url: string,
  fileType: ScreenshotOptions["type"]
) {
  const options = isProd
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 2048, height: 1024, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const element = await page.$("#preview");
  if (!element) {
    throw new Error("#preview element not found");
  }
  return await element.screenshot({ type: fileType });
}
