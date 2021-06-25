import React, { useEffect, useState } from "react";
import classes from "./identifier.module.css";
import axios from "../../axios/axios";
import PostHeader from "./postHeader/Header";
import ContentViewer from "./content/Content";
import ImageViewer from "./ImageViewer/ImageViewer";
import PostFooter from "./postFooter/PostFooter";
import CommentSection from "./commentSection/CommentSection";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import VideoPlayer from "../../videoPlayer/Youtube";

const Identifier = ({ item, fetchData }) => {
  const [open, setOpen] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const commentButtonClick = () => {
    setOpen(!open);
  };
  const { enqueueSnackbar } = useSnackbar();
  const onCommentsRaisers = (postId, index) => {
    let dislikedAudio = new Audio("/tick.mp3");
    let likedAudio = new Audio("/click.mp3");
    setLikeLoading(true);
    axios
      .patch(`/identifierPost/like/${postId}/${userId}`)
      .then((result) => {
        enqueueSnackbar(result.data.message, { variant: "success" });
        if (result.data.message == "disliked") {
          dislikedAudio.play();
        }
        if (result.data.message == "Liked") {
          likedAudio.play();
        }
        setLikeLoading(false);
        fetchData();
      })
      .catch((error) => {
        setLikeLoading(false);
        enqueueSnackbar("Error occurred");
      });
  };
  if (item.onlyMe && item.userId === userId) {
    return (
      <div className={classes.mainDivIdentifier}>
        <div className={classes.IdentifierFirstDiv}>
          <PostHeader
            userId={item.userId}
            name={item.uploadedByName}
            time={item.date}
            authType={item.authType}
            postId={item._id}
            fetchData={fetchData}
            onlyMe={true}
          />
          <ContentViewer content={item.postContent} />
          {item.youTubeLink !== "" && item.youTubeLink && (
            <div>
              <VideoPlayer
                videoId={item.youTubeLink}
                className={classes.youTubeDiv}
              />
              <div style={{ height: "10px" }}></div>
            </div>
          )}
          {item.images.length !== 0 && <ImageViewer images={item.images} />}
          <PostFooter
            commentButtonClick={commentButtonClick}
            onCommentsRaisers={() => onCommentsRaisers(item._id)}
            likeLoading={likeLoading}
            userId={userId}
            likes={item.likes ? item.likes : []}
          />
          <CommentSection
            id={item._id}
            comments={item.comments ? item.comments : []}
            open={open}
          />
        </div>
      </div>
    );
  } else if (!item.onlyMe) {
    return (
      <div className={classes.mainDivIdentifier}>
        <div className={classes.IdentifierFirstDiv}>
          <PostHeader
            userId={item.userId}
            name={item.uploadedByName}
            time={item.date}
            authType={item.authType}
            postId={item._id}
            fetchData={fetchData}
            onlyMe={false}
          />
          <ContentViewer content={item.postContent} />
          {item.youTubeLink !== "" && item.youTubeLink && (
            <div>
              <VideoPlayer
                videoId={item.youTubeLink}
                className={classes.youTubeDiv}
              />
              <div style={{ height: "10px" }}></div>
            </div>
          )}
          {item.images.length !== 0 && <ImageViewer images={item.images} />}
          <PostFooter
            commentButtonClick={commentButtonClick}
            onCommentsRaisers={() => onCommentsRaisers(item._id)}
            likeLoading={likeLoading}
            userId={userId}
            likes={item.likes ? item.likes : []}
          />
          <CommentSection
            id={item._id}
            comments={item.comments ? item.comments : []}
            open={open}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Identifier;
