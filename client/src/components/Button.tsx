import React from "react";
import styles from "../styles/components/Button.module.scss";

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} type="submit" className={styles.button}>
      {children}
    </button>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default Button;
