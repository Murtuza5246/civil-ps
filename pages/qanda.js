import dynamic from "next/dynamic";
const QandA = dynamic(
  () => {
    return import("../components/qAndA/QandA");
  },
  { ssr: false }
);

const QandAPage = () => {
  return (
    <div>
      <QandA />
    </div>
  );
};
export default QandAPage;
