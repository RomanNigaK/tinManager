import { useState } from "react";

export const useUrl = () => {
  const commonsUrl = ["/", "/reg", "/reg/"];
  const [state, setstate] = useState(false);
  const [url, setUrl] = useState(window.location.pathname);
  if (url === ("/reg" || "/")) {
    console.log("url verno", url);
    setstate(true);
  } else {
    console.log("url not", url);
    setstate(false);
  }
  return { state };
};
