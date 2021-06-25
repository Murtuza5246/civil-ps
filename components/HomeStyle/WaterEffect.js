import React from "react";
import dynamic from "next/dynamic";
import WaterWave from "react-water-wave";
import { NoSsr } from "@material-ui/core";

const Demo = (props) => {
  // try {
  return (
    <NoSsr>
      <WaterWave
        style={{ width: "100%", height: "100%", backgroundSize: "cover" }}
        imageUrl={`https://www.gizbot.com/images/2020-09/realme-7_159921061900.jpg`}
        // imageUrl={`/${props.image}.jpg`}
      >
        {/* {() => props.children} */}
      </WaterWave>
    </NoSsr>
  );
  // } catch {
  //   return null;
  // }
  // return (
  //   <div style={{ paddingTop: "60px" }}>
  //     <h1>hello</h1>
  //   </div>
  // );
};
export default Demo;
