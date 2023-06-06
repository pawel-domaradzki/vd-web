import { selectBookmarks } from "@/state/features/bookmarks/bookmarksSelectors";
import { useSelector } from "react-redux";
import Results from "@/components/Results";
import SearchBox from "@/components/SearchBox";

const Bookmarked = () => {
  const bookmarks = useSelector(selectBookmarks);

  return (
    <>
      <SearchBox />

      <Results title={"Bookmarked Titles"} results={bookmarks} />
    </>
  );
};

export default Bookmarked;
