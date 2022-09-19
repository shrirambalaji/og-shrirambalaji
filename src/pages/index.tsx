import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import OgImage from "../components/OgImage";

export interface ImageQueryParams extends ParsedUrlQuery {
  backgroundUrl?: string;
  blur?: string;
  center?: string;
  date?: string;
  highlight?: string;
  subtitle?: string;
  title: string;
  hideUsername?: string;
}

const Images = () => {
  const router = useRouter();
  const { subtitle, highlight, title, date, backgroundUrl, blur, center, hideUsername } = router.query as unknown as ImageQueryParams;
  
  return (
    <OgImage
      backgroundUrl={backgroundUrl as string}
      blur={blur}
      center={center}
      date={date as string}
      hideUsername={hideUsername as string}
      highlight={highlight as string}
      subtitle={subtitle as string}
      title={title as string}
    />
  );
};

export default Images;
