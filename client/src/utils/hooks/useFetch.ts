import Rect, { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json));
    }
  }, [url]);

  return {
    data,
  };
};
