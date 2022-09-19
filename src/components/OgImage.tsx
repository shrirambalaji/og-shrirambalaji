import React from "react";
import cn from "classnames";
import { ImageQueryParams } from "../pages";

interface ImageProps extends ImageQueryParams {}

const IMAGE_WIDTH = "1200px";
const IMAGE_HEIGHT = "630px";

const textColors = {
  primary: "text-white",
  secondary: "text-ghostindigo-300",
  tertiary: "text-ghostindigo-500",
  quarternary: "text-ghostindigo-700",
};

const OgImage: React.FC<ImageProps> = ({
  title = "",
  subtitle = "",
  date,
  highlight,
  backgroundUrl,
  blur,
  center,
  hideUsername,
}) => {
  const isCode = title.startsWith("`") && title.endsWith("`");
  if (isCode) title = title.substring(1).slice(0, -1);

  const titleFontStyle = isCode ? `font-mono` : `font-sans`;
  const shouldHighlightTitle = highlight === "true";
  const titleFontSize =
    title.length >= 40 ? "text-5xl leading-normal" : "text-7xl leading-tight";

  if (backgroundUrl) {
    textColors.secondary =
      textColors.tertiary =
      textColors.quarternary =
        "text-gray-100";
  }

  return (
    <div className="bg-ghostindigo-900 text-fg flex min-h-screen w-full items-center justify-center">
      <div
        id="preview"
        className={`relative flex h-full flex-col justify-between p-[80px]`}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          alignItems: center ? "center" : "start",
        }}
      >
        <picture
          className={cn("absolute z-10 h-full w-full left-0 top-0", {
            "blur-3xl": blur,
          })}
          style={{
            backgroundSize: backgroundUrl ? "cover" : "auto",
            backgroundImage: backgroundUrl
              ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${backgroundUrl})`
              : "var(--bg-graph)",
          }}
        />
        {date && (
          <p
            className={`font-regular font-sans text-lg ${textColors.quarternary} z-20`}
          >
            {date}
          </p>
        )}
        <div
          className="flex flex-col justify-center z-20"
          style={{ height: center ? "100%" : "auto" }}
        >
          <h1
            style={{ fontWeight: 600 }}
            className={cn(`${titleFontSize} ${titleFontStyle} text-white`, {
              [`w-fit rounded-xl bg-indigo-400 px-[15px] text-center`]:
                shouldHighlightTitle && !backgroundUrl,
            })}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mt-2 font-sans text-2xl tracking-wide ${textColors.secondary}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <footer className="bottom-24 z-20">
          {!hideUsername && (
            <p
              className={`font-regular font-sans text-2xl ${textColors.tertiary}`}
            >
              @shrirambalaji
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default OgImage;
