import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { apiDomain } from "../apiPath";
// import HomeStyle from "../components/HomeStyle/HomeStyle";
const HomeStyle = dynamic(
  () => {
    return import("../components/HomeStyle/HomeStyle");
  },
  { ssr: false }
);
export default function Home() {
  return (
    <div>
      <Head>
        <title>
          Problemspotter - Civil engineering construction live problems
        </title>
        <meta
          id="meta-description"
          name="description"
          content={
            "civil engineering construction problems statements by industrial person and approved by experts"
          }
        />
        <meta
          id="og-title"
          property="og:title"
          content={
            "civil engineering Construction site problems , Educational website for civil engineering students , Learn the current scenario of construction site,What kind of problems they are facing"
          }
        />
        <meta
          id="og-image"
          property="og:image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script> */}
      </Head>

      <HomeStyle />
    </div>
  );
}
