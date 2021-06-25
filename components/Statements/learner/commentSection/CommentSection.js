import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import axios from "../../../axios/axios";
import {
  Button,
  ButtonBase,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { InputGroup, InputGroupAddon } from "reactstrap";
import { useSnackbar } from "notistack";
import classes from "./comment.module.css";
import TextEditor from "../TextEditor/TextEditor";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import * as actionCreator from "../../../../redux/actions/index";

import NewCommentSection from "./NewCommentSection";
import { apiDomain } from "../../../../apiPath";

export default function CommentSection(props) {
  const email = useSelector((state) => state.user.email);
  const [gettingData, setGettingData] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const fName = useSelector((state) => state.user.fName);
  const [uploading, setUploading] = useState(false);
  const lName = useSelector((state) => state.user.lName);
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const authType = useSelector((state) => state.user.authType);

  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (props.open) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  }, [props.open]);

  const submitQuestionHandler = (objectData, mentionsData) => {
    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();

    let newData = {
      name: fName + " " + lName,

      time: time,
      date: date,
      userId: userId,
      email,
      authType,
      answer: JSON.stringify(objectData),
      mentions: JSON.stringify(mentionsData),
    };
    setUploading(true);
    axios
      .patch(`/learnerPost/comment/${props.id}`, newData)
      .then((result) => {
        setUploading(false);
        setCollapse(!collapse);
        if (authType === "Student") {
          dispatch(actionCreator.userLevelCheck(userId));
        }
        setGettingData(!gettingData);

        enqueueSnackbar("Comment Added", { variant: "success" });
        statementFetcher();
      })
      .catch((err) => {
        setUploading(false);
        setCollapse(!collapse);
        setGettingData(!gettingData);

        enqueueSnackbar(err.message);
        console.log(err);
      });
  };
  const gettingDataClicker = () => {
    setGettingData(!gettingData);
  };

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  const [firstSlice, setFirstSlice] = useState(0);
  const [secondSlice, setSecondSlice] = useState(1);
  const [loadPreButton, setLoadPreButton] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (comments.length >= 2) {
      setFirstSlice(comments.length - 1);
      setSecondSlice(comments.length);
    } else if (comments.length === 1) {
      setFirstSlice(0);
      setSecondSlice(comments.length);
    } else {
      setFirstSlice(0);
      setSecondSlice(comments.length);
    }
  }, [comments]);

  const statementFetcher = (id) => {
    axios
      .get(`/learnerPost/getcomments/${props.id}`)
      .then((result) => {
        setComments(result.data.comments);
        if (result.data.comments.length === 0) setCollapse(true);
      })
      .catch();
  };
  const loadPrevious = () => {
    setLoading(true);
    setLoadPreButton(true);
    setTimeout(() => {
      setFirstSlice(0);
      setSecondSlice(comments.length);
      setLoading(false);
    }, 2000);
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
  const list = (
    <div className={classes.overlapTextCut}>
      <div className={classes.manageDiv} style={{ marginBottom: "20px" }}>
        {collapse && (
          <Grid container>
            <Grid item xs={2} md={1} lg={1} xl={1}>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                <img
                  className={classes.imageDiv}
                  src={
                    userId
                      ? `${apiDomain}/image/profile/${userId}`
                      : "/hider.png"
                  }
                />
              </div>
            </Grid>
            <Grid item xs={10} md={11} lg={11} xl={11}>
              {textEditorError()}
            </Grid>
          </Grid>
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
                {"    "}Submit{"    "}
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
      </div>

      <div className={classes.commentListClass}>
        {comments.length > 1 && !loadPreButton && (
          <ButtonBase onClick={loadPrevious}>
            Load previous {" " + comments.length - 1}
          </ButtonBase>
        )}
        {loading && (
          <ButtonBase>
            <CircularProgress size={10} />
          </ButtonBase>
        )}
        <List>
          {comments.slice(firstSlice, secondSlice).map((items) => (
            <NewCommentSection
              key={items._id}
              item={items}
              userId={props.userId}
              verifiedUsers={verifiedUsers}
              statementFetcher={statementFetcher}
              uploadId={props.id}
              statementUserId={props.userId}
            />
          ))}
        </List>
      </div>
      <Divider />
    </div>
  );

  return <div style={{ width: "100%" }}>{list}</div>;
}
