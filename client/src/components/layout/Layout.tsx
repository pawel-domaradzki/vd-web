import React from "react";
import Header from "./Header";
import styles from "@/styles/Home.module.scss";
import classNames from "classnames";

import { Outfit } from "@next/font/google";
import Head from "next/head";

const outfit = Outfit({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
        <main className={classNames(styles.main, outfit.className)}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
