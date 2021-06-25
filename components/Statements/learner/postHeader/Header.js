import { CircularProgress, Grid, useMediaQuery } from "@material-ui/core";
import React from "react";
import { Img } from "react-image";
import classes from "./postHeader.module.css";
import TimeAgo from "react-timeago";
import OptionMenu from "../optionButton/OptionButton";
import SideNoteBadge from "../../../qAndA/SideNoteBadge";
import { useSelector } from "react-redux";
import Link from "next/link";
import classes1 from "../../../qAndA/qanda.module.css";
import LockIcon from "@material-ui/icons/Lock";
import { apiDomain } from "../../../../apiPath";

const PostHeader = (props) => {
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const width = useMediaQuery("(min-width:500px)");

  return (
    <div className={classes.postHeaderMain}>
      <Grid container>
        <Grid item xs={2} md={1} lg={1} xl={1}>
          <Img
            className={classes.postHeaderProfile}
            src={
              props.userId !== ""
                ? `${apiDomain}/image/profile/${props.userId}`
                : "/hider.png"
            }
            alt="iProfile"
            loader={<CircularProgress size={17} />}
          />
        </Grid>
        <Grid item xs={9} md={10} lg={10} xl={10}>
          <div
            style={{ width: "100%", textAlign: "left" }}
            className={classes.fontFamilyName}
          >
            <span>
              {" "}
              <Link href={`/user/details/${props.name}/${props.userId}`}>
                <a className={classes1.nameTagHandler}> {props.name}</a>
              </Link>
            </span>
            {props.authType === "Admin" && (
              <SideNoteBadge
                title="Admin"
                component={<i className="fas fa-check-circle"></i>}
              />
            )}
            {props.authType === "Identifier" && (
              <SideNoteBadge
                title="Identifier"
                component={<i className="fas fa-hard-hat"></i>}
              />
            )}
            {props.authType === "Professor" && (
              <SideNoteBadge
                title="Professor"
                component={
                  <i
                    // style={{ color: "blue" }}
                    className="fas fa-user-tie"
                  ></i>
                }
              />
            )}

            {verifiedUsers.filter((items) => items.userId === props.userId)
              .length === 1 && (
              <i
                style={{ color: "blue" }}
                className="fas fa-check-circle fa-xs"
              ></i>
            )}
            {props.onlyMe && <LockIcon fontSize="small" color="disabled" />}
            <div className={classes.doingAt}>
              {props.item.doing !== "" && props.item.doing && (
                <span>
                  <strong>Doing </strong>{" "}
                  <span style={{ marginLeft: width ? "10px" : "5px" }}>
                    {" "}
                    {" " + props.item.doing}
                  </span>
                </span>
              )}
              {props.item.at !== "" && props.item.at && (
                <span style={{ marginLeft: width ? "10px" : "5px" }}>
                  <strong>at </strong>{" "}
                  <span style={{ marginLeft: width ? "10px" : "5px" }}>
                    {" " + props.item.at}
                  </span>
                </span>
              )}
            </div>
            <p>
              <TimeAgo
                date={props.time}
                style={{ color: "grey", fontSize: "10px" }}
              />
            </p>
          </div>
        </Grid>
        <Grid item xs={1} md={1} lg={1} xl={1}>
          <OptionMenu
            postUploaderId={props.userId}
            postId={props.postId}
            fetchData={props.fetchData}
            onlyMe={props.onlyMe}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PostHeader;
