import React from "react";
import cn from "classnames";
import { OgSearchParams } from "../pages/api/images";

const IMAGE_WIDTH = "1200px";
const IMAGE_HEIGHT = "630px";

const palette = {
  white: "#000",
  ghostindigo: {
    DEFAULT: "#111118",
    50: "#EAEAF0",
    100: "#DBDBE6",
    200: "#BDBDD1",
    300: "#A0A0BB",
    400: "#8282A6",
    500: "#66668F",
    600: "#505072",
    700: "#3B3B54",
    800: "#262636",
    900: "#111118",
  },
};
const textColors = {
  primary: palette.white,
  secondary: palette.ghostindigo[300],
  tertiary: palette.ghostindigo[500],
  quarternary: palette.ghostindigo[300],
};

const OgImage: React.FC<OgSearchParams> = ({
  title = "",
  subtitle,
  date,
  highlight,
  backgroundImageURL,
  backgroundOverlayOpacity,
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
  const overlayOpacity = backgroundOverlayOpacity ?? "0.5";

  if (backgroundImageURL) {
    textColors.secondary =
      textColors.tertiary =
      textColors.quarternary =
        "text-gray-100";
  }

  const GridSvg = () => (
    <div
      tw="flex absolute inset-0"
      style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <defs>
          <pattern
            fillOpacity="0.25"
            fill="#262636"
            id="graph"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z" />
            <path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z" />
          </pattern>
        </defs>
        <rect x="0" y="0" fill="url(#graph)" width="100%" height="100%" />
      </svg>
    </div>
  );

  return (
    <div
      tw="text-lg flex min-h-screen w-full items-center justify-center"
      style={{ backgroundColor: "#111118", color: "white" }}
    >
      <div
        id="preview"
        tw={`relative flex h-full flex-col justify-between p-[80px]`}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          alignItems: center ? "center" : "flex-start",
        }}
      >
        {!backgroundImageURL ? (
          <GridSvg />
        ) : (
          <img
            tw={cn("absolute  h-full w-full left-0 top-0", {
              "blur-3xl": blur,
            })}
            style={{
              backgroundSize: "cover",
              backgroundImage: `linear-gradient( rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity}) ), url(${backgroundImageURL})`
            }}
          />
        )}
        {date && <p tw={`font-regular font-sans text-lg`}>{date}</p>}
        <div
          tw="flex flex-col justify-center z-20"
          style={{ height: center ? "100%" : "auto" }}
        >
          <h1
            style={{ fontWeight: 600 }}
            tw={cn(`${titleFontSize} ${titleFontStyle} text-white`, {
              [`w-fit rounded-xl bg-indigo-400 px-[15px] text-center`]:
                shouldHighlightTitle && !backgroundImageURL,
            })}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              tw={`mt-2 font-sans text-2xl tracking-wide ${textColors.secondary}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div tw="flex bottom-24">
          {!hideUsername && (
            <p tw={`font-regular font-sans text-2xl`}>@shrirambalaji</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OgImage;
