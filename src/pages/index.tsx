import { useRouter } from "next/router";
import React from "react";
import OgImage from "../components/OgImage";

const Images = () => {
  const router = useRouter();
  const { subtitle, highlight, title, date, backgroundUrl, blur } = router.query;
  
  return (
    <OgImage
      blur={blur as string}
      backgroundUrl={backgroundUrl as string}
      date={date as string}
      highlight={highlight as string}
      subtitle={subtitle as string}
      title={title as string}
    />
  );
};

export default Images;
