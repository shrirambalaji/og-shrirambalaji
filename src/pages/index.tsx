import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import OgImage from "../components/OgImage";

export interface ImageQueryParams extends ParsedUrlQuery {
  backgroundImageURL?: string;
  backgroundOverlayOpacity?: string;
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
  const imageQueryParams = router.query as unknown as ImageQueryParams;
  return <OgImage {...imageQueryParams} />;
};

export default Images;
