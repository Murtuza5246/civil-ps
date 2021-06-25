import React from "react";

const SelectedDocuments = (props) => {
  return (
    <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
      <iframe
        title="Pdf"
        // className={classes.iframeViewer}
        width="100%"
        height="600"
        frameborder="0"
        src={`${props.filename}`}
      ></iframe>
    </div>
  );
};

export default SelectedDocuments;
