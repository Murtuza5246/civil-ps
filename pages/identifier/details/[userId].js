import dynamic from "next/dynamic";

import { useRouter } from "next/router";
const IdentifierDetails = dynamic(
  async () => {
    return import("../../../components/identifierDetails/IdentifierDetails");
  },
  { ssr: false }
);

const IdentifierDetailsPage = () => {
  const router = useRouter();
  return <IdentifierDetails userId={router.query.userId} />;
};

export default IdentifierDetailsPage;
