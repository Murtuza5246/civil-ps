import * as React from "react";
import Announcement from "react-announcement";

const Notification = () => {
  return (
    <Announcement
      title="QandA section is updated"
      subtitle="In QandA section , the top liked answer will get shifted to top for better understanding."
      link="/qanda"
      imageSource={"https://problemspotter.com/LOGO.png"}
      daysToLive={365}
      secondsBeforeBannerShows={2}
      closeIconSize={30}
    />
  );
};

export default Notification;
