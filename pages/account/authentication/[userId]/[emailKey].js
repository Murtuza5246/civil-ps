import dynamic from "next/dynamic";

import { useRouter } from "next/router";
const EmailVerification = dynamic(
  async () => {
    return import("../../../../components/EmailVerification/EmailVerification");
  },
  { ssr: false }
);

const EmailVerificationPage = () => {
  const router = useRouter();
  return (
    <EmailVerification
      emailKey={router.query.emailKey}
      userId={router.query.userId}
    />
  );
};

export default EmailVerificationPage;
