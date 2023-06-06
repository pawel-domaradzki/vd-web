import { FC, useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "../../styles/components/NavOptions.module.scss";
import Movies from "../../assets/icon-nav-movies.svg";
import Home from "../../assets/icon-nav-home.svg";
import TvSeries from "../../assets/icon-nav-tv-series.svg";
import Bookmark from "../../assets/icon-nav-bookmark.svg";
import Link from "next/link";

const NavOptions: FC = () => {
  const router = useRouter();

  const { pathname } = router;
  const { genre } = router.query;

  return (
    <ul role="list" className={styles.menuOptions}>
      <Link href="/?genre=all">
        <Home
          className={classnames(styles.icon, genre === "all" && styles.active)}
        />
      </Link>
      <Link href="/?genre=movies">
        <Movies
          className={classnames(
            styles.icon,
            genre === "movies" && styles.active
          )}
        />
      </Link>
      <Link href="/?genre=tv">
        <TvSeries
          className={classnames(styles.icon, genre === "tv" && styles.active)}
        />
      </Link>
      <Link href="bookmarked">
        <Bookmark
          className={classnames(
            styles.icon,
            pathname === "/bookmarked" && styles.active
          )}
        />
      </Link>
    </ul>
  );
};

export default NavOptions;
