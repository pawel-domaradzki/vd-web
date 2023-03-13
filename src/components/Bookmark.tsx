import { BookmarkIcon } from "./BookmarkIcon";
import styles from "../styles/components/Bookmark.module.scss";
import { useState } from "react";

const Bookmark = () => {
  const [fillIcon, setFillIcon] = useState(false);
  return (
    <button className={styles.bookmark} onClick={() => setFillIcon(!fillIcon)}>
      <BookmarkIcon filled={fillIcon} />
    </button>
  );
};

export default Bookmark;
