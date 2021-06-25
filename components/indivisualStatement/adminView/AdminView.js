import { Button, Chip, CircularProgress, Grid } from "@material-ui/core";
import { Markup } from "interweave";
import React from "react";
import { useSelector } from "react-redux";
import { WhatsappShareButton } from "react-share";
import ReactTimeago from "react-timeago";
import YouTubePlayer from "../../videoPlayer/Youtube";
import classes from "../indivisual.module.css";
import ProfileDeatils from "../profileDetails/ProfileDetails";
import KeywordShowcase from "../keyword/KeywordShowcase";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ImageCarasol from "../ImageCarasol/ImageCarasol";
import StatementAction from "../statementAction/StatementAction";
import Link from "next/link";
import { apiDomain } from "../../../apiPath";

const AdminView = (props) => {
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const userId = useSelector((state) => state.user.userId);

  return (
    <div className={classes.flexComponent}>
      <div className={classes.spacebetween}>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={4} md={4}>
            <p>
              <strong>Place:</strong>
              {props.statement.place} <i className="fas fa-map-marker-alt"></i>
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
            {/* </div> */}
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
          </Grid>
        </Grid>
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
              <p>
                <strong>Name:</strong>
                <Link
                  href={`/user/details/${props.statement.identifier.replace(
                    / /g,
                    "-"
                  )}/${props.statement.userId}`}
                >
                  <a> {props.statement.identifier}</a>
                </Link>
                {verifiedUsers.filter(
                  (el) => el.userId === props.statement.userId
                ).length === 1 && (
                  <i
                    style={{ color: "blue" }}
                    className="far fa-check-circle"
                  ></i>
                )}
              </p>
            </div>
            <div>
              <p>
                <strong>Org:</strong>
                {props.statement.organization}
                {"   "}
                <a href={props.statement.organizationLink} target="_default">
                  <i className="fas fa-external-link-alt"></i>
                </a>
                <i className="fas fa-sitemap"></i>
              </p>
            </div>
          </div>
        </div>
        <hr className={classes.myHrHandlingClass} />
        <div className={classes.thirdClassComponent}>
          <div>
            <h2 className={classes.h2Tag}>
              Title{"  "}
              {props.approved ? (
                <i
                  style={{ color: "green" }}
                  className="fas fa-check-square"
                ></i>
              ) : (
                <i style={{ color: "red" }} className="fas fa-window-close"></i>
              )}
            </h2>
          </div>

          <div>
            <h3>{props.statement.title}</h3>
          </div>
        </div>
        <hr className={classes.myHrHandlingClass}></hr>

        <div className={classes.thirdClassComponent}>
          <div>
            <h4 className={classes.h4Tag}>
              Statement Detail <i className="fas fa-info-circle"></i>
            </h4>
          </div>
          <div>
            {props.statement ? (
              <div className={classes.imagesFromData}>
                <article className={classes.markupImagesSizehandler}>
                  <Markup content={props.contentState} />
                </article>
              </div>
            ) : (
              <p>{"Loading"}</p>
            )}
          </div>
          {props.statement.youTubeURL !== "" && props.statement.youTubeURL && (
            <div className={classes.youtubevideohandler}>
              <h6>
                {(props.statement.youTubeURLDescription !== "" ||
                  props.statement.youTubeURLDescription) &&
                  "YouTube Video Description"}
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
          <KeywordShowcase data={props.statement.keywords} />
        </div>

        <hr className={classes.myHrHandlingClass}></hr>

        {props.statement.statementImage.filter(
          (image) =>
            image.contentType === "image/jpeg" ||
            image.contentType === "image/png"
        ).length !== 0 && (
          <div className={classes.imageCarasol}>
            <div className={classes.carasolMarginClass}>
              <ImageCarasol
                images={props.statement.statementImage.filter(
                  (image) =>
                    image.contentType === "image/jpeg" ||
                    image.contentType === "image/png"
                )}
              />
            </div>
          </div>
        )}
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
                  {/* <DocxLoader file /> */}
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
                    width="200%"
                    height="200"
                    frameborder="0"
                    src={
                      `${apiDomain}/image/image/${items.filename}`
                    }
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
        <hr className={classes.myHrHandlingClass}></hr>
        {props.statement.link !== "" && (
          <div className={classes.thirdClassComponent}>
            <a href={props.statement.link} target="_default">
              {props.statement.linkTitle === "" || !props.statement.linkTitle
                ? props.statement.link
                : props.statement.linkTitle}
            </a>
          </div>
        )}

        <hr style={{ width: "100%" }} />
        <Grid container className={classes.myComments}>
          <Grid item xs={4} lg={4} md={4} xl={4}>
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

          <Grid item xs={4} lg={4} md={4} xl={4}>
            <WhatsappShareButton
              url={`https://problemspotter.com/statement/id/${props.statement.title
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                .replace(/ /g, "-")}/${props.statement._id}`}
            >
              <Button variant="contained" color="secondary">
                <i className="fab fa-whatsapp"></i> Share
              </Button>
            </WhatsappShareButton>
          </Grid>
          <Grid item xs={4} lg={4} md={4} xl={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => props.editingModeButton()}
            >
              <i className="fas fa-edit">EDIT</i>
            </Button>
          </Grid>
          <StatementAction
            email={props.statement.email}
            name={props.statement.identifier}
            details={props.statement}
            onReloading={() => props.onReloading(props.statement._id)}
            _id={props.statement._id}
          />
        </Grid>
      </div>
    </div>
  );
};

export default AdminView;
