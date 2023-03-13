import { FC } from "react";
import classnames from "classnames";
import styles from "../../styles/components/NavOptions.module.scss";
import Movies from "../../assets/icon-nav-movies.svg";
import Home from "../../assets/icon-nav-home.svg";
import TvSeries from "../../assets/icon-nav-tv-series.svg";
import Bookmark from "../../assets/icon-nav-bookmark.svg";
import Link from "next/link";

const NavOptions: FC = () => {
  return (
    <ul role="list" className={styles.menuOptions}>
      <Link href="?genre=all">
        <Home className={classnames(styles.icon, styles.active)} />
      </Link>
      <Link href="?genre=movies">
        <Movies className={styles.icon} />
      </Link>
      <Link href="?genre=tv">
        <TvSeries className={styles.icon} />
      </Link>
      <Link href="?genre=bookmark">
        <Bookmark className={styles.icon} />
      </Link>
    </ul>
  );
};

export default NavOptions;
