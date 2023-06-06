import { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state/features/auth/authSlice";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import styles from "../styles/components/Login.module.scss";
import Link from "next/link.js";
import Image from "next/image.js";
import { API_BASE_URL } from "@/utils/requests";
import { selectBookmarks } from "@/state/features/bookmarks/bookmarksSelectors";
import { selectAuth } from "@/state/features/auth/authSelectors";
import { compareBookmarks } from "@/utils/bookmarks";
import { addMissingBookmarks, getBookmarks } from "@/utils/apiClient";
import { replaceBookmarks } from "@/state/features/bookmarks/bookmarksSlice";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Can't be empty"),
  password: yup.string().required("Can't be empty"),
});

const initialValuesLogin: LoginValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [pageType, setPageType] = useState("login");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { user, token } = useSelector(selectAuth);
  const localStorageBookmarks = useSelector(selectBookmarks);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLogin = pageType === "login";

  useEffect(() => {
    const fetchBookmarksAndCompare = async () => {
      if (user && token) {
        const missingBookmarks = await compareBookmarks(
          user._id,
          localStorageBookmarks
        );

        if (
          typeof missingBookmarks !== "undefined" &&
          missingBookmarks.length !== 0
        ) {
          await addMissingBookmarks({
            userId: user._id,
            token,
            bookmarks: missingBookmarks,
          });
        }

        const updatedBookmarks = await getBookmarks(user._id);
        dispatch(replaceBookmarks(updatedBookmarks));

        router.push("/");
      }
    };

    fetchBookmarksAndCompare();
  }, [user?.displayName]);

  const login = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    try {
      const loggedInResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        setInvalidCredentials(!invalidCredentials);
        throw new Error("Login failed");
      }

      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
      }
    } catch (error) {
      console.log("An error occurred during login:", error);
    }
  };

  const handleFormSubmit = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    if (isLogin) await login(values, onSubmitProps);
  };

  return (
    <div className={styles.wrapper}>
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
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
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
          <form
            onSubmit={handleSubmit}
            className={styles.loginContainer}
            onChange={() => setInvalidCredentials(false)}
          >
            <h1>Login</h1>

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

            {invalidCredentials && (
              <p className={styles.textError}>Incorrect Password or Email</p>
            )}

            <Button>Login to your account</Button>

            <h2>
              Don&apos;t have an account?
              <Link href={"/sign-up"} onClick={() => resetForm()}>
                {" "}
                Sign Up
              </Link>
            </h2>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;

interface LoginValues {
  email: string;
  password: string;
}
