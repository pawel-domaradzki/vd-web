import Navigation from "./NavOptions";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/components/Header.module.scss";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { selectUser } from "@/state/features/auth/authSelectors";
import { useSelector } from "react-redux";
import classNames from "classnames";

const Header = () => {
  const user = useSelector(selectUser);

  return (
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
            <Link href={user ? "/profile" : "/sign-in"}>
              <UserCircleIcon
                className={classNames(styles.userIcon, {
                  [styles.active]: user,
                })}
              />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
