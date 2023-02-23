import Head from "next/head";
import Image from "next/image";
import { Outfit } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import classnames from "classnames";
import Header from "@/components/layout/Header";
import SearchBox from "@/components/SearchBox";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
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
          <SearchBox />
        </main>
      </div>
    </>
  );
}
