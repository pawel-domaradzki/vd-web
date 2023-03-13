import styles from "../styles/components/SearchBox.module.scss";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBox = ({ handleChange }) => {
  return (
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
  );
};

export default SearchBox;
