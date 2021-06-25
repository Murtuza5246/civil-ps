import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const LoaderSpinner = () => (
  <div style={{ width: "95%", margin: "auto" }}>
    <Segment>
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>

      <Image src="/paragraph.png" />
    </Segment>
    <Segment>
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>

      <Image src="/paragraph.png" />
    </Segment>
    <Segment>
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>

      <Image src="/paragraph.png" />
    </Segment>
  </div>
);

export default LoaderSpinner;
