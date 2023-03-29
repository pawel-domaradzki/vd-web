import LoginForm from "@/components/LoginForm";
import { Outfit } from "@next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const SignIn = () => {
  return (
    <main className={outfit.className}>
      <LoginForm />
    </main>
  );
};

export default SignIn;
