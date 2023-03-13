import Navigation from "./NavOptions";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/components/Header.module.scss";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Header = () => (
  <div className={styles.headerWrapper}>
    <header className={styles.header}>
      <nav className={styles.primaryNavigation}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="Logo"
            width={33}
            height={27}
            priority
          />
        </Link>

        <Navigation />

        <div className={styles.account}>
          <UserCircleIcon className={styles.userIcon} />
        </div>
      </nav>
    </header>
  </div>
);

export default Header;
