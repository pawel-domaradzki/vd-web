import Head from "next/head";
import { Outfit } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import classnames from "classnames";
import Header from "@/components/layout/Header";
import SearchBox from "@/components/SearchBox";
import Slider from "@/components/Slider";
import Results from "@/components/Results";
import { requests, searchQuery } from "@/utils/requests";
import { Maybe, TrendingResponse } from "../utils/types.ts";
import { useState, useEffect } from "react";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home({ results, trendingToday, genre }: ResponseProps) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  /*   useEffect(() => {
    const searchRes = fetch(
      searchQuery("2670a71658ecbaa1cb43a4ab3fb9ad35", search)
    ).then((res) => res.json());

    setSearchResult(searchRes.results);
  }, [search]);
 */
  console.log(searchResult);
  return (
    <>
      <Head>
        <title>vd-web</title>
        <meta name="description" content="VD Web your entertainment web-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <Header />
        <main className={classnames(styles.main, outfit.className)}>
          <SearchBox handleChange={handleChange} />
          {trendingToday && !genre ? <Slider results={trendingToday} /> : <></>}
          <div className={styles.resultsContainer}></div>
          {<Results results={results} />}
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

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
}

interface ResponseProps {
  results: [TrendingResponse];
  trendingToday: [TrendingResponse];
  genre: Maybe<string>;
}
