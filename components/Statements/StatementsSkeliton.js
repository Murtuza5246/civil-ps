import { useMediaQuery } from "@material-ui/core";
import React from "react";
import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";

const StatementsPlaceholder = (props) => {
  const width = useMediaQuery("(min-width:500px)");
  return (
    <div className={props.className}>
      <Segment
        style={{
          width: width ? "97%" : "100%",
          height: width ? "200px" : "260px",
        }}
      >
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>

        <Image src="/paragraph.png" />
        {width ? null : <Image src="/paragraph.png" />}
      </Segment>
      <Segment
        style={{
          width: width ? "97%" : "100%",
          height: width ? "200px" : "260px",
        }}
      >
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>

        <Image src="/paragraph.png" />
        {width ? null : <Image src="/paragraph.png" />}
      </Segment>
      <Segment
        style={{
          width: width ? "97%" : "100%",
          height: width ? "200px" : "260px",
        }}
      >
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>

        <Image src="/paragraph.png" />
        {width ? null : <Image src="/paragraph.png" />}
      </Segment>
      <Segment
        style={{
          width: width ? "97%" : "100%",
          height: width ? "200px" : "260px",
        }}
      >
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>

        <Image src="/paragraph.png" />
        {width ? null : <Image src="/paragraph.png" />}
      </Segment>
    </div>
  );
};

export default StatementsPlaceholder;
