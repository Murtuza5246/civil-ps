import React from "react";

const YouTubePlayer = (props) => {
  try {
    function youtube_parser(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);

      return match && match[7].length == 11 ? match[7] : false;
    }

    return (
      <div>
        {youtube_parser(props.videoId) && (
          <iframe
            title="video"
            id="player"
            type="text/html"
            allowfullscreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
            className={props.className}
            src={`https://www.youtube.com/embed/${youtube_parser(
              props.videoId
            )}?enablejsapi=1&origin=https://problemspotter.com`}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    );
  } catch {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <p>Video link was not correct</p>
      </div>
    );
  }
};

export default YouTubePlayer;
