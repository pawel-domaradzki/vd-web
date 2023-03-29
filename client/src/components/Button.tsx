import styles from "../styles/components/Button.module.scss";

const Button = ({ children }) => {
  return (
    <button type="submit" className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
