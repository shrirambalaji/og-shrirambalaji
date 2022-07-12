import * as playwright from "playwright-aws-lambda";
export type ScreenShotFileType = "png" | "jpeg";
export async function getScreenshot(url: string, fileType: ScreenShotFileType) {
  const options = process.env.AWS_REGION
    ? {
        args: playwright.getChromiumArgs(true),
        headless: true,
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
  let browser = null;
  console.log('>>--SHRIRAM-->>options', options);
  try {
    browser = await playwright.launchChromium(options);
    const context = await browser.newContext({
      viewport: { width: 2048, height: 1024 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    console.log('>>--SHRIRAM-->>page', page);
    await page.goto(url, { waitUntil: "networkidle" });
    const element = await page.$("#preview");
    if (!element) {
      throw new Error("#preview element not found");
    }
    return await element.screenshot({ type: fileType });
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
