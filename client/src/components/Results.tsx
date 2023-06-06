import Thumbnail from "./Thumbnail";
import styles from "../styles/components/Results.module.scss";
import { Results } from "../utils/types";

const Results = ({ results, title}: Results) => {
  return (
    <>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.resultsContainer}>
        {results.map((result) => (
          <Thumbnail key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

export default Results;
