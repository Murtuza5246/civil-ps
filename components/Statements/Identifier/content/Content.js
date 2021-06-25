import React from "react";
import { Markup } from "interweave";
import classes from "./content.module.css";
import draftToHtml from "draftjs-to-html";

const Content = (props) => {
  const customEntityTransform = (entity, text) => {
    if (entity.type === "mention") {
      return `<a href="${entity.data.mention.url}" target="_blank">${text}</a>`;
    } else if (entity.type === "link") {
      var re = new RegExp("^(http|https)://", "i");
      function addhttp(url) {
        if (!re.test(url)) {
          url = "https://" + url;
        }
        return url;
      }
      return `<a href="${addhttp(entity.data.text)}" target="_blank">${
        entity.data.url
      }</a>`;
    } else if (entity.type === "LINK") {
      var re1 = new RegExp("^(http|https)://", "i");
      function addhttp(url) {
        if (!re1.test(url)) {
          url = "https://" + url;
        }
        return url;
      }
      return `<a href="${addhttp(entity.data.url)}" target="_blank">${
        entity.data.url
      }</a>`;
    } else {
      return;
    }
  };
  return (
    <div className={classes.contentHead}>
      <Markup
        content={draftToHtml(
          JSON.parse(props.content),
          {},
          false,
          customEntityTransform
        )}
      />
    </div>
  );
};

export default Content;
