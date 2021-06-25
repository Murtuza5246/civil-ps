import dynamic from "next/dynamic";
const Signup = dynamic(
  () => {
    return import("../components/user/signUp/SignUp");
  },
  { ssr: false }
);

const SignupPage = () => {
  return <Signup />;
};
export default SignupPage;
