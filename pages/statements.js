import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import * as actionCreator from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "../components/axios/axios";
import Head from "next/head";
import { apiDomain } from "../apiPath";

const Statements = dynamic(
  () => {
    return import("../components/Statements/Statements");
  },
  { ssr: false }
);

const StatementsPage = ({ data }) => {
  return (
    <div>
      <Head>
        {/* General */}
        <title>
          Problemspotter.com - a database of civil construction daily problems
        </title>
        <meta
          name="title"
          content="Problemspotter.com - a database of civil construction daily problems"
        />
        <meta
          name="description"
          content={`Are you a civil engineer ? Then this platform is just made for you. Here you will find what actual civil life is how it is working.`}
        />
        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${apiDomain}/websiteLogo/newlogo.jpg`}
        />
        <meta
          name="msapplication-TileImage"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        ></meta>
        <meta
          property="og:title"
          content={`Problemspotter.com - a database of civil construction daily problems`}
        />
        <meta
          property="og:description"
          content={`Are you a civil engineer ? Then this platform is just made for you. Here you will find what actual civil life is how it is working.`}
        />
        <meta
          property="og:image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://civil.problemspotter.com/statements`}
        />
        <meta
          property="twitter:title"
          content={`Problemspotter.com - a database of civil construction daily problems`}
        />
        <meta
          property="twitter:description"
          content={`Are you a civil engineer ? Then this platform is just made for you. Here you will find what actual civil life is how it is working.`}
        />
        <meta
          property="twitter:image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
      </Head>
      <Statements data={data} />
    </div>
  );
};
StatementsPage.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `${apiDomain}/statements/userStatements/approved`
  );
  const json = await res.json();

  return { data: json };
};
export default StatementsPage;
