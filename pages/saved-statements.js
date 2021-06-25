import dynamic from "next/dynamic";
const SavedStatements = dynamic(
  () => {
    return import("../components/savedStatements/SavedStatements");
  },
  { ssr: false }
);

const SavedStatementsPage = () => {
  return <SavedStatements />;
};
export default SavedStatementsPage;
