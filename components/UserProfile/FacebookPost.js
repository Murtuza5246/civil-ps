import React from "react";

const FacebookPosts = (props) => {
  return (
    <div
      class="fb-page"
      data-href={
        props.facebook
          ? props.facebook
          : "https://www.facebook.com/DatabaseOfCivilConstructionProblems"
      }
      data-tabs="timeline"
      data-width="400"
      data-height=""
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite={
          props.facebook
            ? props.facebook
            : "https://www.facebook.com/DatabaseOfCivilConstructionProblems"
        }
        class="fb-xfbml-parse-ignore"
      >
        <a
          href={
            props.facebook
              ? props.facebook
              : "https://www.facebook.com/DatabaseOfCivilConstructionProblems"
          }
        >
          click here to open facebook page
        </a>
      </blockquote>
    </div>
  );
};

export default FacebookPosts;
