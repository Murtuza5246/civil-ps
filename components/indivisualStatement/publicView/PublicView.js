import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WhatsappShareButton } from "react-share";
import ReactTimeago from "react-timeago";
import YouTubePlayer from "../../videoPlayer/Youtube";
import classes from "../indivisual.module.css";
import classes1 from "./publicAds.module.css";
import ProfileDeatils from "../profileDetails/ProfileDetails";
import KeywordShowcase from "../keyword/KeywordShowcase";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ImageCarasol from "../ImageCarasol/ImageCarasol";
import Link from "next/link";
import ShareIcons from "../../shareIcons/ShareIcons";
import ImageZoom from "../../imageZoomer/ImageZomm";
import AdSense from "react-adsense";
import Suggestions from "../Suggestions/Suggestions";
import CommentSection from "../commentSection/commentSection";
import Head from "next/head";
import { apiDomain } from "../../../apiPath";

const PublicView = (props) => {
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const userId = useSelector((state) => state.user.userId);
  const [shareButton, setShareButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shareButtonClick = () => {
    setShareButton(!shareButton);
  };
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [width]);
  const width = useMediaQuery("(min-width:500px)");
  const imageZoomingEffect = () => {
    setIsOpen(true);
  };
  const onCloseZoomImage = () => {
    setIsOpen(false);
  };
  const showAd = () => {
    try {
    } catch {}
  };
  function createMarkup() {
    return { __html: props.contentState };
  }

  return (
    <div className={classes1.mainDiv}>
      <Head>
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        ></script>
      </Head>
      <div className={classes1.statementDiv}>
        <div
          id="divcontents"
          className={classes.flexComponent}
          style={{
            border: "2px solid #fff",
            borderWidth: "2px",
            borderColor: props.statement.attention ? "#ffb051" : "#fff",
          }}
        >
          <div id="ifmcontentstoprint"></div>
          {props.statement.statementImage.filter(
            (image) =>
              image.contentType === "image/jpeg" ||
              image.contentType === "image/png"
          ).length !== 0 && (
            <ImageZoom
              images={props.statement.statementImage.filter(
                (image) =>
                  image.contentType === "image/jpeg" ||
                  image.contentType === "image/png"
              )}
              isOpen={isOpen}
              onCloseZoomImage={onCloseZoomImage}
            />
          )}

          <Grid container spacing={2}>
            <Grid item xs={6} lg={4} md={4}>
              <p>
                <strong>Place:</strong>
                {props.statement.place}{" "}
                <i className="fas fa-map-marker-alt"></i>
              </p>
            </Grid>

            <Grid item xs={6} lg={4} md={4}>
              <p>
                <strong>Date:</strong>
                <ReactTimeago date={props.statement.date} />
                <i className="fas fa-calendar-week"></i>
              </p>
            </Grid>
            <Grid item xs={6} lg={4} md={4}>
              <p>
                <strong>Time:</strong>
                {props.statement.time} <i className="far fa-clock"></i>
              </p>
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
              <p>
                <strong>
                  Fields<i className="fas fa-hard-hat"></i>:
                </strong>
                <span style={{ width: "100%", justifyContent: "space-around" }}>
                  {props.statement.field.map((item) => {
                    return (
                      <span style={{ margin: "5px" }}>
                        <Chip label={item.replace(/_/g, " ")} />
                      </span>
                    );
                  })}
                </span>
              </p>
              {!width && (
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-gw-3+1f-3d+2z"
                  data-ad-client="ca-pub-8688069387563825"
                  data-ad-slot="4212974924"
                ></ins>
              )}
            </Grid>
          </Grid>
          {/* <div/> */}
          <hr className={classes.myHrHandlingClass} />
          <div className={classes.SecondClassComponent}>
            <div className={classes.indivisualBox}>
              <ProfileDeatils
                working={props.statement.organization}
                uploaderId={props.statement.userId}
                profileImage={props.statement.profileImage}
                name={props.statement.identifier}
                rating={props.statement.rating}
              />
            </div>
            <div className={classes.identifierDetails}>
              <div>
                <p className={classes.identifierName}>
                  <strong>Name:</strong>
                  <Link
                    href={`/user/details/${props.statement.identifier.replace(
                      / /g,
                      "-"
                    )}/${props.statement.userId}`}
                  >
                    <a> {props.statement.identifier}</a>
                  </Link>
                  {"  "}
                  {verifiedUsers.filter(
                    (el) => el.userId === props.statement.userId
                  ).length === 1 && (
                    <i
                      style={{ color: "blue" }}
                      className="far fa-check-circle"
                    ></i>
                  )}
                  {"   "}
                  {props.statement.shareEmail && (
                    <a href={`mailto:${props.statement.email}`}>
                      <i className="fas fa-envelope"></i>
                    </a>
                  )}
                </p>
              </div>
              <div>
                <p>
                  <strong>Org:</strong>
                  {props.statement.organization}
                  {"   "}
                  {props.statement.organizationLink && (
                    <a
                      href={props.statement.organizationLink}
                      target="_default"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  <i className="fas fa-sitemap"></i>
                </p>
              </div>
            </div>
          </div>
          <hr className={classes.myHrHandlingClass} />
          {!width && (
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-gw-3+1f-3d+2z"
              data-ad-client="ca-pub-8688069387563825"
              data-ad-slot="4212974924"
            ></ins>
          )}
          <div className={classes.thirdClassComponent}>
            <div
              style={{
                textAlign: "right",
                position: "relative",
                // bottom: "27px",
                height: "10px",
                opacity: "0.7",
                color: "grey",
              }}
            >
              <p>
                <strong className={classes.actionAdminNameSignature}>
                  <i>-{props.statement.actionAdminName}</i>
                </strong>
              </p>
            </div>
            <div style={{ position: "relative", bottom: "10px" }}>
              <h2 className={classes.h2Tag}>
                Title
                <i
                  style={{ color: "green" }}
                  className="fas fa-check-square"
                ></i>
              </h2>
            </div>

            <div>
              <h1 style={{ textAlign: "center" }}>{props.statement.title}</h1>
            </div>
            {/* <ins
              class="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-gw-3+1f-3d+2z"
              data-ad-client="ca-pub-8688069387563825"
              data-ad-slot="4212974924"
            ></ins> */}
          </div>

          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <hr className={classes.myHrHandlingClass}></hr>
          <div className={classes.thirdClassComponent}>
            <div>
              <h4 className={classes.h4Tag}>
                Statement Detail{" "}
                <i
                  style={{
                    position: "static",
                    color: "black",
                    fontSize: "15px",
                    top: "0",
                  }}
                  className="fas fa-info-circle"
                ></i>
              </h4>
            </div>
            <div>
              {props.statement ? (
                <div className={classes.imagesFromData}>
                  <article className={classes.markupImagesSizehandler}>
                    {!width && (
                      <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-format="fluid"
                        data-ad-layout-key="-gw-3+1f-3d+2z"
                        data-ad-client="ca-pub-8688069387563825"
                        data-ad-slot="4212974924"
                      ></ins>
                    )}
                    <div
                      dangerouslySetInnerHTML={createMarkup()}
                      className={classes1.mainMarkupDivForImages}
                    />
                    {/* <Markup content={props.contentState} /> */}
                  </article>
                </div>
              ) : (
                <p>{"Loading"}</p>
              )}
            </div>
            {props.statement.youTubeURL !== "" && props.statement.youTubeURL && (
              <div className={classes.youtubevideohandler}>
                <h6 style={{ color: "red" }}>
                  {props.statement.youTubeURLDescription !== "" &&
                    props.statement.youTubeURLDescription &&
                    "YouTube Video Description"}
                  {props.statement.youTubeURLDescription !== "" &&
                    props.statement.youTubeURLDescription && (
                      <span
                        style={{ color: "red" }}
                        className="fab fa-youtube"
                      ></span>
                    )}
                </h6>
                <p>
                  {(props.statement.youTubeURLDescription !== "" ||
                    props.statement.youTubeURLDescription) &&
                    props.statement.youTubeURLDescription}
                </p>
                <YouTubePlayer
                  className={classes.youtubevideohandler1}
                  videoId={props.statement.youTubeURL}
                />
              </div>
            )}
            <div style={{ width: "100%", minHeight: "10px" }}></div>

            <KeywordShowcase data={props.statement.keywords} />
          </div>
          {props.statement.statementImage.filter(
            (image) =>
              image.contentType === "image/jpeg" ||
              image.contentType === "image/png"
          ).length !== 0 && (
            <div className={classes.imageCarasol}>
              <div className={classes.carasolMarginClass}>
                <ImageCarasol
                  imageZoomingEffect={imageZoomingEffect}
                  images={props.statement.statementImage.filter(
                    (image) =>
                      image.contentType === "image/jpeg" ||
                      image.contentType === "image/png"
                  )}
                />
              </div>
            </div>
          )}

          {!width && (
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-gw-3+1f-3d+2z"
              data-ad-client="ca-pub-8688069387563825"
              data-ad-slot="4212974924"
            ></ins>
          )}
          <div className={classes.fourthClassComponent}>
            <div>
              {props.statement.statementImage.filter(
                (ob) =>
                  ob.contentType === "application/pdf" ||
                  ob.contentType === "application/msword" ||
                  ob.contentType ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ).length !== 0 && (
                <div className={classes.attachmentHead}>
                  <h4>Attachments</h4>
                </div>
              )}
              {props.statement.statementImage.map((items) => (
                <div className={classes.fourthClassComponent}>
                  <div>
                    {items.contentType === "image/jpeg" ||
                    items.contentType === "image/png" ? null : items.filename &&
                      items.contentType === "application/pdf" ? (
                      <div className={classes.iframeViewer}>
                        <iframe
                          title="Pdf"
                          // className={classes.iframeViewer}
                          width="100%"
                          height="600"
                          frameborder="0"
                          src={`https://docs.google.com/gview?url=${
                            `${apiDomain}/image/image/${items.filename}`
                          }&embedded=true`}
                        ></iframe>
                        <a
                          href={
                            `${apiDomain}/image/image/${items.filename}`
                          }
                          target="blank"
                        >
                          {" "}
                          {items.originalname}
                        </a>{" "}
                      </div>
                    ) : items.contentType === "application/msword" ? (
                      <div className={classes.iframeViewer}>
                        <iframe
                          title="Pdf"
                          width="100%"
                          height="600"
                          frameborder="0"
                          src={`https://docs.google.com/gview?url=${
                            `${apiDomain}/image/image/${items.filename}`
                          }&embedded=true`}
                        ></iframe>
                        <a
                          href={
                            `${apiDomain}/image/image/${items.filename}`
                          }
                          target="blank"
                        >
                          {" "}
                          {items.originalname}
                        </a>{" "}
                      </div>
                    ) : items.contentType === "image/png" ||
                      items.contentType === "image/jpeg" ||
                      items.contentType === "image/jpg" ? (
                      <div className={classes.iframeViewer}>
                        <img
                          // className={classes.iframeViewer}
                          width="200%"
                          height="200"
                          frameborder="0"
                          src={`${
                            `${apiDomain}/image/image/${items.filename}`
                          }`}
                          alt="attached image"
                        ></img>
                        <a
                          href={
                            `${apiDomain}/image/image/${items.filename}`
                          }
                          target="blank"
                        >
                          {" "}
                          {items.originalname}
                        </a>{" "}
                      </div>
                    ) : items.contentType ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                      <div className={classes.iframeViewer}>
                        <iframe
                          title="Pdf"
                          width="100%"
                          height="600"
                          frameborder="0"
                          src={`https://docs.google.com/gview?url=${
                            `${apiDomain}/image/image/${items.filename}`
                          }&embedded=true`}
                        ></iframe>
                        <a
                          href={
                            `${apiDomain}/image/image/${items.filename}`
                          }
                          target="blank"
                        >
                          {" "}
                          {items.originalname}
                        </a>{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <AdSense.Google
            client="ca-pub-8688069387563825"
            slot="3946215764"
            style={{
              display: "block",
              width: 500,
              height: 300,
              textAlign: "center",
            }}
            layout="in-article"
          /> */}
          <hr style={{ width: "100%", margin: "auto", marginBottom: "5px" }} />
          {props.statement.linkTitle && (
            <div className={classes.referenceLinkHandler}>
              <h6>Reference</h6>
              <a href={props.statement.link} target="_default">
                {props.statement.linkTitle}
              </a>
              <hr className={classes.myHrHandlingClass}></hr>
            </div>
          )}
          <Grid
            container
            className={classes.myComments}
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={2} lg={2} md={2} xl={2}></Grid>
            <Grid item xs={2} lg={2} md={2} xl={2}>
              {props.saveButtonIndex ? (
                <Button variant="contained">
                  <CircularProgress size={20} color="primary" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.onSaveStatementHandler()}
                  disabled={!userId}
                >
                  <BookmarkIcon />
                  Save
                </Button>
              )}
            </Grid>
            <Grid item xs={4} lg={4} md={4} xl={4}></Grid>

            <Grid item xs={2} lg={2} md={2} xl={2}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#05cd51", color: "white" }}
                onClick={() => shareButtonClick()}
              >
                {"Share "} <i className="fas fa-share-alt"></i>
              </Button>
            </Grid>
            <Grid item xs={2} lg={2} md={2} xl={2}></Grid>
          </Grid>
          {shareButton && (
            <div style={{ width: "100%" }}>
              <hr />
              <ShareIcons
                url={`https://civil.problemspotter.com/statement/id/${props.statement.title
                  .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                  .replace(/ /g, "-")}/${props.statement._id}`}
              />
            </div>
          )}
          <div />
        </div>

        <Suggestions fields={props.fields} id={props.id} urlId={props.urlId} />
        {!width && (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8688069387563825"
            data-ad-slot="9079322638"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        )}
        <div className={classes.manageDivForComments}>
          <CommentSection
            id={props.someId}
            comments={props.comments}
            name={props.name}
            userId={props.userId}
          />
        </div>
      </div>
      <div className={classes1.adsDiv}>
        {width && (
          <div style={{ width: "100%", paddingTop: "10px" }}>
            <AdSense.Google
              client="ca-pub-8688069387563825"
              slot="8630129446"
            />
            <AdSense.Google
              client="ca-pub-8688069387563825"
              slot="8630129446"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicView;
