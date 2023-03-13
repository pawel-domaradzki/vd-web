import Thumbnail from "./Thumbnail";
import styles from "../styles/components/Results.module.scss";
import { TrendingResponse } from "../utils/types.ts";

const Results = ({ results }: result) => {
  return (
    <div className={styles.resultsContainer}>
      {results.map((result) => (
        <Thumbnail key={result.id} result={result} />
      ))}
    </div>
  );
};

export default Results;

interface result {
  results: [TrendingResponse];
}
