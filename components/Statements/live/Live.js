import React from "react";
import Chat from "../../chat/Chat";

const LiveSection = () => {
  return (
    <div style={{ textAlign: "center" }}>
      {/* <LiveVideo /> */}
      <img src="/noevents.jpg" style={{ width: "90%", height: "auto" }} />
      <Chat />
    </div>
  );
};

export default LiveSection;
