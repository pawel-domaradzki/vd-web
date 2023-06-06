import styles from "@/styles/Home.module.scss";
import SearchBox from "@/components/SearchBox";
import Slider from "@/components/Slider";
import Results from "@/components/Results";
import { requests, getQueryString } from "@/utils/requests";
import { Maybe, ResultsResponse } from "@/utils/types";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Home({ results, trendingToday, genre }: ResponseProps) {
  return (
    <>
      <SearchBox />

      {trendingToday && !genre ? <Slider results={trendingToday} /> : <></>}

      {results && <Results results={results} title={`Recommended for you`} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ResponseProps> = async (
  context: GetServerSidePropsContext
) => {
  const genre = getQueryString(context.query.genre!) as string;

  const trending = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  const trendingToday = await fetch(
    `https://api.themoviedb.org/3${requests.fetchTrendingToday.url}`
  ).then((res) => res.json());

  return {
    props: {
      results: trending.results,
      trendingToday: trendingToday.results,
      genre: genre || null,
    },
  };
};

interface ResponseProps {
  results: ResultsResponse[];
  trendingToday: ResultsResponse[];
  genre: Maybe<string>;
}
