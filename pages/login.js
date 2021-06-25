import dynamic from "next/dynamic";
import LogIn from "../components/user/login/Login";
// const LogIn = dynamic(
//   () => {
//     return import("../components/user/login/Login");
//   },
//   { ssr: false }
// );
const LoginPage = () => {
  return (
    <div>
      <LogIn />
    </div>
  );
};
export default LoginPage;
