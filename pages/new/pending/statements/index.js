import dynamic from "next/dynamic";
const ApprovalAdmin = dynamic(
  () => {
    return import("../../../../components/statement_approval/ApprovalAdmin");
  },
  { ssr: false }
);

const ApprovalAdminPage = () => {
  return <ApprovalAdmin />;
};
export default ApprovalAdminPage;
