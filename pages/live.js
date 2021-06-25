import dynamic from "next/dynamic";
const Live = dynamic(
  () => {
    return import("../components/chat/ChatMain");
  },
  { ssr: false }
);

const LivePage = () => {
  return (
    <div>
      <Live />
    </div>
  );
};
export default LivePage;
