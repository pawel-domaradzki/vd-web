import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import styles from "../styles/components/Login.module.scss";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/requests";
import Image from "next/image";

const registerSchema = yup.object().shape({
  displayName: yup.string().required("Can't be empty").min(2, "Too Short!"),
  email: yup.string().email("Invalid email").required("Can't be empty"),
  password: yup.string().required("Can't be empty"),
});

const initialValuesRegister: RegisterValues = {
  displayName: "",
  email: "",
  password: "",
};

const Register = () => {
  const router = useRouter();

  const register = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const savedUserResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    await register(values, onSubmitProps);
    router.push("/sign-in");
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
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
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
            <h1>Sign Up</h1>

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

            <Button>Create an account</Button>

            <h2>
              Already have an account?
              <Link href={"/sign-in"} onClick={() => resetForm()}>
                {" "}
                Login
              </Link>
            </h2>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

interface RegisterValues {
  displayName: string;
  email: string;
  password: string;
}
