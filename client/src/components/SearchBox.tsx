import React, { useEffect, useState } from "react";
import styles from "../styles/components/SearchBox.module.scss";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Maybe } from "yup";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { searchQuery } from "@/utils/requests";
import { useFetch } from "@/utils/hooks/useFetch";
import Results from "./Results";
import { ResultsResponse } from "@/utils/types";

const SearchBox = () => {
  const [value, setValue] = useDebounce("", 300);
  const [searchResult, setSearchResult] = useState<Maybe<SearchResult>>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const query = searchQuery(value);

  const { data } = useFetch(query);

  useEffect(() => {
    if (data) setSearchResult(data);
  }, [data]);

  const sortSearchingResults = (results: ResultsResponse[]) => {
    return results
      .filter(
        (item) =>
          item.popularity > 1 && (item.backdrop_path || item.poster_path)
      )
      .sort((a, b) => b.popularity - a.popularity);
  };

  const displaySearchResults = (): Maybe<React.ReactElement> => {
    if (searchResult && value.length) {
      const sortedSearchResults = sortSearchingResults(searchResult.results);

      return (
        <Results
          results={sortedSearchResults}
          title={`Found ${sortedSearchResults.length} results for '${value}'`}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.searchBox}>
        <button className={styles.searchBtn}>
          <MagnifyingGlassIcon className={styles.icon} />
        </button>
        <input
          type="text"
          placeholder="Search for movies or TV series"
          onChange={handleChange}
        />
      </div>
      {displaySearchResults()}
    </>
  );
};
export default SearchBox;

interface SearchResult {
  page: number;
  results: ResultsResponse[];
  total_pages: number;
  total_results: number;
}
