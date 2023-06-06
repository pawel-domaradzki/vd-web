import { getBookmarks } from "./apiClient";
import { ResultsResponse } from "./types";

export const handleFetchBookmarks = async (userId: string) => {
  const fetched = await getBookmarks(userId);
  console.log(fetched);
};

export const compareBookmarks = async (
  userId: string,
  locallyStored: ResultsResponse[]
) => {
  try {
    const bookmarksFromDB = await getBookmarks(userId);
    const missingBookmarks = locallyStored.filter((storeBookmark) => {
      return !bookmarksFromDB.some(
        (dbBookmark: ResultsResponse) => dbBookmark.id === storeBookmark.id
      );
    });

    return missingBookmarks;
  } catch (error) {
    console.log(error);
  }
};
