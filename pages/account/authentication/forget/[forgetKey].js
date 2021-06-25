import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const PasswordReset = dynamic(
  () => {
    return import("../../../../components/PasswordReset/PasswordReset.js");
  },
  { ssr: false }
);

const PasswordResetPage = () => {
  const router = useRouter();
  return <PasswordReset id={router.query.forgetKey} />;
};
export default PasswordResetPage;
