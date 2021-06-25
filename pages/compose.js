import dynamic from "next/dynamic";
const Compose = dynamic(
  () => {
    return import("../components/ComposeStatements/ComposeStatements.js");
  },
  { ssr: false }
);

const ComposePage = () => {
  return <Compose />;
};
export default ComposePage;
