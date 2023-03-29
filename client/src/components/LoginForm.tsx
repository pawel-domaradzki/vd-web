import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/index.ts";
import FormInput from "./FormInput";
import Button from "./Button";
import { useRouter } from "next/navigation";
import styles from "../styles/components/Login.module.scss";

const registerSchema = yup.object().shape({
  displayName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

interface RegisterValues {
  displayName: string;
  email: string;
  password: string;
}

const initialValuesRegister: RegisterValues = {
  displayName: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const router = useRouter();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onsubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    onsubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      router.push("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className={styles.loginContainer}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          {isRegister && (
            <>
              <FormInput
                label="Display Name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  Boolean(touched.displayName) && Boolean(errors.displayName)
                }
                helperText={touched.displayName && errors.displayName}
                name="displayName"
                value={values.displayName}
              />
            </>
          )}

          <FormInput
            label="Email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            name="email"
            value={values.email}
          />

          <FormInput
            label="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            name="password"
            value={values.password}
          />

          <Button>
            {isLogin ? "Login to your account" : "Create an account"}
          </Button>

          <button
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
