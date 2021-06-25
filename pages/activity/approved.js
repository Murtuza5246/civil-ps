import dynamic from "next/dynamic";
const Approved = dynamic(
  () => {
    return import("../../components/ApprovedStatements/ApprovedStatements");
  },
  { ssr: false }
);

const ApprovedPage = () => {
  return <Approved />;
};
export default ApprovedPage;
