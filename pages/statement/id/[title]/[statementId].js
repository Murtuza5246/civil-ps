// import dynamic from "next/dynamic";
import Head from "next/head";
// import { getAllPostIds } from "../../../../lib/posts";
import { useRouter } from "next/router";
import { apiDomain } from "../../../../apiPath.js";
// import axios from "../../../../components/axios/axios";
import Statement from "../../../../components/indivisualStatement/IndivisualStatement.js";
// const Statement = dynamic(
//   async () => {
//     return import(
//       "../../../../components/indivisualStatement/IndivisualStatement.js"
//     )
//       .then()
//       .catch("../../../about.js");
//   },
//   { ssr: false }
// );

const StatementPage = ({ data, description, imageUrl }) => {
  const router = useRouter();
  return (
    <div>
      {data && (
        <Head>
          {/* General */}
          <title>PS - {data.title}</title>
          <meta name="title" content={data.title} />
          <meta name="description" content={description} />
          {/* Facebook */}
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://civil.problemspotter.com/user/statement/id/${router.query.statementId}`}
          />
          <meta
            name="msapplication-TileImage"
            // content={
            //   data.statementImage.length !== 0
            //     ? `https://my-server-problemspotter.herokuapp.com/image/image/${data.statementImage[0].filename}`
            //     : "https://my-server-problemspotter.herokuapp.com/websiteLogo/newlogo.jpg"
            // }
            content={imageUrl}
          ></meta>
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content={imageUrl}
            // content={
            //   data.statementImage.length !== 0
            //     ? `https://my-server-problemspotter.herokuapp.com/image/image/${data.statementImage[0].filename}`
            //     : "https://my-server-problemspotter.herokuapp.com/websiteLogo/newlogo.jpg"
            // }
          />
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content={`https://civil.problemspotter.com/user/statement/id/${router.query.statementId}`}
          />
          <meta property="twitter:title" content={data.title} />
          <meta property="twitter:description" content={description} />
          <meta
            property="twitter:image"
            content={imageUrl}
            // content={
            //   data.statementImage.length !== 0
            //     ? `https://my-server-problemspotter.herokuapp.com/image/image/${data.statementImage[0].filename}`
            //     : "https://my-server-problemspotter.herokuapp.com/websiteLogo/newlogo.jpg"
            // }
          />
        </Head>
      )}
      {data && <Statement id={router.query.statementId} data={data} />}
    </div>
  );
};
// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }
// export async function getStaticProps() {
//   return {};
// }
StatementPage.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `${apiDomain}/statements/user/statements/${query.statementId}`
  );
  const json = await res.json();
  let description = "";
  let imageUrl =
    `${apiDomain}/websiteLogo/newlogo.jpg`;
  try {
    let string = [];
    if (json.statementImage.length !== 0) {
      imageUrl = `${apiDomain}/image/image/${json.statementImage[0].filename}`;
    }
    let statementData = JSON.parse(json.statement).blocks;

    for (let i = 0; i < statementData.length; i++) {
      string.push(statementData[i].text);
    }
    description = string.toString();
  } catch {
    description = "Welcome to civil engineering field";
  }
  return { data: json, description, imageUrl };
};

export default StatementPage;
