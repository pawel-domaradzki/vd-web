import styles from "../styles/components/FormInput.module.scss";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  helperText?: string | boolean;
}

const FormInput = ({
  error,
  helperText,
  label,
  value,
  ...otherProps
}: FormInputProps) => {
  return (
    <div className={styles.group}>
      <input className={styles.formInput} value={value} {...otherProps} />
      {label && (
        <label
          className={`${
            typeof value === "string" && value.length ? styles.shrink : ""
          } ${styles.formInputLabel}`}
        >
          {label}
        </label>
      )}

      {error && helperText && <p className={styles.errorText}>{helperText}</p>}
    </div>
  );
};

export default FormInput;
