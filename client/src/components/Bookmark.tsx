import { BookmarkIcon } from "./BookmarkIcon";
import styles from "../styles/components/Bookmark.module.scss";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark,
} from "@/state/features/bookmarks/bookmarksSlice";
import { ResultsResponse } from "@/utils/types";
import { selectBookmarks } from "@/state/features/bookmarks/bookmarksSelectors";

import { selectAuth } from "@/state/features/auth/authSelectors";
import { AppDispatch, store } from "@/state/store";
import { updateBookmarks } from "@/utils/apiClient";

interface BookmarkProps {
  result: ResultsResponse;
}

const Bookmark = ({ result }: BookmarkProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector(selectBookmarks);

  const { user, token } = useSelector(selectAuth);

  useEffect(() => {
    const foundBookmark = bookmarks.find(
      (bookmark) => bookmark.id === result.id
    );

    setIsBookmarked(!!foundBookmark);
  }, [bookmarks.length, result.id]);

  const handleBookmarkClick = async () => {
    if (isBookmarked) {
      dispatch(removeBookmark(result));
    } else {
      dispatch(addBookmark(result));
    }

    const updatedBookmarks = selectBookmarks(store.getState());

    if (user && token && updatedBookmarks) {
      updateBookmarks({ userId: user._id, token, bookmarks: updatedBookmarks });
    }
  };

  return (
    <button className={styles.bookmark} onClick={handleBookmarkClick}>
      <BookmarkIcon filled={isBookmarked} />
    </button>
  );
};

export default Bookmark;
