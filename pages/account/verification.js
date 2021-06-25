import dynamic from "next/dynamic";
const Verification = dynamic(
  () => {
    return import("../../components/verification/Verification");
  },
  { ssr: false }
);

const VerificationPage = () => {
  return <Verification />;
};
export default VerificationPage;
