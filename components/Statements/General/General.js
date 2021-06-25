import React, { useEffect, useState } from "react";
import classes from "../State.module.css";
import Link from "next/link";
import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SwipeableTemporaryDrawer from "../comments/Comments";
import { WhatsappShareButton } from "react-share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import YouTubePlayer from "../../videoPlayer/Youtube";

// import { Img } from "react-image";
import Image from "next/image";
import { Label } from "semantic-ui-react";
import WritingBoxGeneral from "./writingBox/WritingBox";
import { useSelector } from "react-redux";
import ImageCarasol from "../../indivisualStatement/ImageCarasol/ImageCarasol";
import ShareIcons from "../../shareIcons/ShareIcons";
import ShareIcon from "@material-ui/icons/Share";
import ImageZoom from "../../imageZoomer/ImageZomm";
import { apiDomain } from "../../../apiPath";

const General = (props) => {
  const composeHandler = useSelector((state) => state.user.composeHandler);
  const [share, setShare] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  const shareButtonClick = (index) => {
    setShare(index);
  };
  const resetShareButton = () => {
    setShare(-1);
  };
  const imageZoomingEffect = (index) => {
    setIsOpen(index);
  };
  const onCloseZoomImage = () => {
    setIsOpen(false);
  };
  let statementsMap = props.statementsFields
    .slice(props.firstValue, props.secondValue)
    .map((items, index) => (
      <div
        id="containerDiv"
        className={classes.flexComponent}
        key={items._id}
        style={{
          border: "2px solid #fff",
          borderWidth: "2px",
          borderColor: items.attention ? "#ffb051" : "#fff",
        }}
      >
        {items.statementImage.filter(
          (image) =>
            image.contentType === "image/jpeg" ||
            image.contentType === "image/png"
        ).length !== 0 && (
          <ImageZoom
            images={items.statementImage.filter(
              (image) =>
                image.contentType === "image/jpeg" ||
                image.contentType === "image/png"
            )}
            isOpen={isOpen === index}
            onCloseZoomImage={onCloseZoomImage}
          />
        )}
        {items.label && (
          <Label
            as="a"
            color={items.label === "Problem" ? "red" : "green"}
            ribbon="right"
          >
            {items.label}
          </Label>
        )}
        <Grid container>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <div className={classes.ImageHandler}>
              <div>
                <Tooltip title={items.identifier} placement="right">
                  <Image
                    className={classes.identifierProfile}
                    src={
                      items.userId !== ""
                        ? `${apiDomain}/image/profile/${items.userId}`
                        : "/hider.png"
                    }
                    alt="iProfile"
                    loader={<CircularProgress size={17} />}
                    width="43"
                    height="43"
                  />
                </Tooltip>{" "}
                {items.attention && (
                  <Tooltip title="Attention required" placement="bottom">
                    <i className="fas fa-bell"></i>
                  </Tooltip>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={4}>
            {" "}
            <div className={classes.headingHandler}>
              <p>
                <strong>Place:</strong>
                {items.place} <i className="fas fa-map-marker-alt"></i>
              </p>
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={4}>
            <div className={classes.headingHandler}>
              <p>
                <strong>Field</strong>:{items.field[0].replace(/_/g, " ")}
                {"   "}
                <i className="fas fa-hard-hat"></i>
              </p>
            </div>
          </Grid>
        </Grid>
        <hr className={classes.myHrForDesign} />
        <div className={classes.tableDiv}>
          <table className={classes.mainTable}>
            <tbody>
              <tr>
                <td>
                  <h4>Title:</h4>
                </td>
                <td>
                  <p className={classes.titleInGeneral}>
                    {items.title.substr(0, 100)}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ fontWeight: "bold" }}>Statement:</p>
                </td>
                <td>
                  <p
                    style={{
                      marginLeft: "5px",
                      color: "rgb(180, 180, 180)",
                    }}
                  >
                    {"To view in detail click ➡ "}
                    <Link
                      href={`/statement/id/${items.title
                        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                        .replace(/ /g, "-")}/${items._id}`}
                    >
                      <a className={classes.myReadMoreTag}>
                        {" "}
                        view full statement
                      </a>
                    </Link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr></hr>
        {items.statementImage.filter(
          (image) =>
            image.contentType === "image/jpeg" ||
            image.contentType === "image/png"
        ).length !== 0 && (
          <div className={classes.imageCarasol}>
            <div className={classes.carasolMarginClass}>
              <ImageCarasol
                imageZoomingEffect={() => imageZoomingEffect(index)}
                images={items.statementImage.filter(
                  (image) =>
                    image.contentType === "image/jpeg" ||
                    image.contentType === "image/png"
                )}
              />
            </div>
            <hr />
          </div>
        )}
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-gw-3+1f-3d+2z"
          data-ad-client="ca-pub-8688069387563825"
          data-ad-slot="7892021630"
        ></ins>
        {items.youTubeURL !== "" && items.youTubeURL && (
          <div className={classes.youTubeVideoHandler}>
            <YouTubePlayer
              className={classes.youTubeVideoHandler10}
              videoId={items.youTubeURL}
            />
            <p>
              {items.youTubeURLDescription &&
                items.youTubeURLDescription.substr(0, 50) + "..."}
            </p>
            <hr></hr>
            <wbr></wbr>
          </div>
        )}

        <div style={{ paddingBottom: "15px" }}>
          <Grid container className={classes.myComments}>
            <Grid item xs={12} lg={6} md={6} xl={6}>
              <div className={classes.DisscussionButton}>
                <SwipeableTemporaryDrawer
                  comNumber={items.comments.length}
                  question={items.title}
                  id={items._id}
                  userId={items.userId}
                  name={items.identifier}
                  comments={items.comments}
                />
              </div>
            </Grid>
            <Grid item xs={6} lg={3} md={3} xl={3}>
              {props.saveButtonIndex === index ? (
                <Button variant="contained">
                  <CircularProgress size={20} color="primary" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.onsaveClickButton(index)}
                  disabled={!props.userId}
                >
                  <BookmarkIcon />
                  Save
                </Button>
              )}
            </Grid>

            <Grid item xs={6} lg={3} md={3} xl={3}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#05cd51", color: "white" }}
                onClick={
                  share === index
                    ? () => resetShareButton()
                    : () => shareButtonClick(index)
                }
              >
                {"Share "} <ShareIcon />
              </Button>
            </Grid>
            {share === index && (
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <hr
                  style={{ width: "90%", margin: "auto", marginTop: "10px" }}
                />
                <ShareIcons
                  url={`https://civil.problemspotter.com/statement/id/${items.title
                    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                    .replace(/ /g, "-")}/${items._id}`}
                />
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    ));

  return (
    <div className={classes.MainGeneralClass}>
      {composeHandler && <WritingBoxGeneral />}
      {statementsMap}
    </div>
  );
};
export default General;
