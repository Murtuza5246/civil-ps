import React, { useState } from "react";
import { Comment, Form, Header } from "semantic-ui-react";
import { Markup } from "interweave";
import draftToHtml from "draftjs-to-html";
import { Button, Typography } from "@material-ui/core";
import SideNoteBadge from "../../../qAndA/SideNoteBadge";
import classes from "./comment.module.css";
import Link from "next/link";
import CreateIcon from "@material-ui/icons/Create";
import { InputGroup, InputGroupAddon } from "reactstrap";
import TextEditor from "../TextEditor/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Tooltip } from "@material-ui/core";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import axios from "../../../axios/axios";
import TimeAgo from "react-timeago";
import * as actionCreator from "../../../../redux/actions/index";
import { useSnackbar } from "notistack";
import { apiDomain } from "../../../../apiPath";

const CommentExampleComment = ({
  item,
  verifiedUsers,
  statementUserId,
  uploadId,
  statementFetcher,
}) => {
  const [collapse, setCollapse] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [gettingData, setGettingData] = useState(false);
  const fName = useSelector((state) => state.user.fName);
  const userId = useSelector((state) => state.user.userId);
  const lName = useSelector((state) => state.user.lName);
  const authType = useSelector((state) => state.user.authType);
  const profileImage = useSelector((state) => state.statement.profileImage);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

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
        entity.data.url.length > 25
          ? entity.data.url.slice(0, 22) + "..."
          : entity.data.url
      }</a>`;
    } else {
      return;
    }
  };
  const gettingDataClicker = () => {
    setGettingData(!gettingData);
  };
  const submitQuestionHandler = (objectData, mentionsData) => {
    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();
    if (objectData.blocks[0].text === "") {
      enqueueSnackbar("Please First Write Something!!");
      return;
    }
    if (objectData.blocks[0].text.length <= 5) {
      enqueueSnackbar("too small!!");
      return;
    }
    if (objectData.blocks[0].text.length > 5) {
      let newData = {
        name: fName + " " + lName,

        time: time,
        date: date,
        userId: userId,
        authType,
        answer: JSON.stringify(objectData),
        mentions: JSON.stringify(mentionsData),
      };
      setUploading(true);
      axios
        .patch(`/learnerPost/replies/${uploadId}/${item._id}/`, newData)
        .then((result) => {
          setUploading(false);
          setCollapse(!collapse);
          if (authType === "Student") {
            dispatch(actionCreator.userLevelCheck(userId));
          }
          setGettingData(!gettingData);

          statementFetcher();
        })
        .catch((err) => {
          setUploading(false);
          setCollapse(!collapse);
          setGettingData(!gettingData);

          enqueueSnackbar(err.message);
          console.log(err);
        });
    }
  };
  const textEditorError = () => {
    try {
      return (
        <TextEditor
          submitQuestionHandler={(data, mentionsData) =>
            submitQuestionHandler(data, mentionsData)
          }
          gettingData={gettingData}
        ></TextEditor>
      );
    } catch {
      return <div>textEditor error;;</div>;
    }
  };
  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar
          src={`${apiDomain}/image/profile/${item.userId}`}
        />
        <Comment.Content>
          <Comment.Author as="a">
            {item.userId === statementUserId ? (
              <span className={classes.nameBackground}>
                <CreateIcon style={{ fontSize: "15px" }} />{" "}
                <Link
                  href={`/user/details/${item.name.replace(/ /g, "-")}/${
                    item.userId
                  }`}
                >
                  <a className={classes.nameTagHandler}> {item.name}</a>
                </Link>
              </span>
            ) : (
              <Link
                href={`/user/details/${item.name.replace(/ /g, "-")}/${
                  item.userId
                }`}
              >
                <a className={classes.nameTagHandler}>{item.name}</a>
              </Link>
            )}

            {item.authType === "Admin" && (
              <SideNoteBadge
                title="Admin"
                component={<i className="fas fa-check-circle"></i>}
              />
            )}
            {item.authType === "Professor" && (
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

            {verifiedUsers.filter((items) => items.userId === item.userId)
              .length === 1 && (
              <i
                style={{ color: "blue" }}
                className="fas fa-check-circle fa-xs"
              ></i>
            )}
          </Comment.Author>
          <Comment.Metadata>
            <div>
              <TimeAgo date={item.date} />
            </div>
            <div>{item.time}</div>
          </Comment.Metadata>
          <Comment.Text>
            <Markup
              content={draftToHtml(
                JSON.parse(item.answer),
                {},
                false,
                customEntityTransform
              )}
            />
          </Comment.Text>
          {/* <Comment.Actions>
            <Comment.Action> */}
          {collapse && (
            <div style={{ width: "95%" }}>
              <Typography style={{ color: "grey" }}>
                Replying to @{item.name}
              </Typography>
              {textEditorError()}
            </div>
          )}
          <InputGroup>
            <InputGroupAddon addonType="append">
              {email && !uploading ? (
                <Button
                  type="submit"
                  color="secondary"
                  disabled={!userId || !collapse}
                  onClick={(e) => gettingDataClicker(e, "success")}
                >
                  {"    "}reply{"    "}
                </Button>
              ) : (
                email && (
                  <Button variant="contained">
                    <CircularProgress size={15} color="secondary" />
                  </Button>
                )
              )}
              {!email && (
                <Button type="submit" variant="outlined">
                  <Link href="/login">
                    <a style={{ color: "red", textDecoration: "none" }}>
                      {" "}
                      {"    "}LogIn{"    "}
                    </a>
                  </Link>
                </Button>
              )}
            </InputGroupAddon>
            <Tooltip title="Collapse">
              <Button onClick={() => setCollapse(!collapse)}>
                <SwapVerticalCircleIcon
                  style={{ color: !collapse ? "#005086" : "grey" }}
                />
              </Button>
            </Tooltip>
          </InputGroup>
        </Comment.Content>
        {item.replies &&
          item.replies.map((el, index) => (
            <Comment.Group
              key={
                Math.random(index, index * 100) +
                Math.random(index, index * 100)
              }
            >
              <Comment>
                <Comment.Avatar
                  src={`${apiDomain}/image/profile/${el.userId}`}
                />

                <Comment.Content>
                  <Comment.Author as="a">
                    {el.userId === item.userId ? (
                      <span className={classes.replyNameBackground}>
                        <CreateIcon style={{ fontSize: "15px" }} />{" "}
                        <Link
                          href={`/user/details/${el.name.replace(/ /g, "-")}/${
                            el.userId
                          }`}
                        >
                          <a className={classes.nameTagHandler}> {el.name}</a>
                        </Link>
                      </span>
                    ) : (
                      <Link
                        href={`/user/details/${el.name.replace(/ /g, "-")}/${
                          el.userId
                        }`}
                      >
                        <a className={classes.nameTagHandler}>{el.name}</a>
                      </Link>
                    )}

                    {el.authType === "Admin" && (
                      <SideNoteBadge
                        title="Admin"
                        component={<i className="fas fa-check-circle"></i>}
                      />
                    )}
                    {el.authType === "Professor" && (
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

                    {verifiedUsers.filter((items) => items.userId === el.userId)
                      .length === 1 && (
                      <i
                        style={{ color: "blue" }}
                        className="fas fa-check-circle fa-xs"
                      ></i>
                    )}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      <TimeAgo date={el.date} />
                    </div>
                    <div>{el.time}</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <Markup
                      content={draftToHtml(
                        JSON.parse(el.answer),
                        {},
                        false,
                        customEntityTransform
                      )}
                    />
                  </Comment.Text>
                  <Comment.Actions></Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          ))}
      </Comment>
    </Comment.Group>
  );
};

export default CommentExampleComment;
