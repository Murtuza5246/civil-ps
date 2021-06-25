import dynamic from "next/dynamic";
const ForgetPassword = dynamic(
  () => {
    return import("../../../components/user/login/ForgetPassword");
  },
  { ssr: false }
);

const ForgetPasswordPage = () => {
  return <ForgetPassword />;
};
export default ForgetPasswordPage;
