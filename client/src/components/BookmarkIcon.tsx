import { FC } from "react";

interface BookmarkIcon {
  filled?: boolean;
}

export const BookmarkIcon: FC<BookmarkIcon> = ({ filled }) => {
  const fill = filled ? "#fff" : "none";

  return (
    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
        stroke="#fff"
        strokeWidth="1.5"
        fill={fill}
      />
    </svg>
  );
};
