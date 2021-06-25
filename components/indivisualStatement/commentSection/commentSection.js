import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import axios from "../../axios/axios";
import {
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { InputGroup, InputGroupAddon } from "reactstrap";
import { useSnackbar } from "notistack";
import classes from "./comments.module.css";
import TextEditor from "../../qAndA/TextEditor/TextEditor";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";

import NewCommentSection from "./NewComment";

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
  const profileImage = useSelector((state) => state.statement.profileImage);

  const [comments, setComments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar("Question is too small!!");
      return;
    }
    if (objectData.blocks[0].text.length > 5) {
      let newData = {
        name: fName + " " + lName,
        profileImage,
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
        .patch("/statements/new/answer/" + props.id, newData)
        .then((result) => {
          setUploading(false);
          setCollapse(!collapse);
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
    }
  };
  const gettingDataClicker = () => {
    setGettingData(!gettingData);
  };

  useEffect(() => {
    statementFetcher(props.id);
  }, []);

  const statementFetcher = (id) => {
    axios
      .get("/statements/getcomments/" + props.id)
      .then((result) => {
        setComments(result.data.comments);
        if (result.data.comments.length === 0) setCollapse(true);
      })
      .catch();
  };

  const list = (
    <div>
      <div className={classes.manageDiv} style={{ marginBottom: "20px" }}>
        {fName && <h6>{"@" + fName + " " + lName}</h6>}

        {collapse && (
          <TextEditor
            submitQuestionHandler={(data, mentionsData) =>
              submitQuestionHandler(data, mentionsData)
            }
            gettingData={gettingData}
          >
            <Typography>
              Write your thoughts below.
              <span style={{ color: "grey", fontSize: "15px" }}>
                You can mention someone by just adding "@".
              </span>
              <hr />
            </Typography>
          </TextEditor>
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
      {comments.length === 0 && (
        <div style={{ textAlign: "center", color: "grey" }}>
          <h4>Be The first to make a thought.</h4>
        </div>
      )}
      <hr />

      <List>
        {comments.map((items) => (
          <NewCommentSection
            item={items}
            userId={props.userId}
            verifiedUsers={verifiedUsers}
            statementFetcher={statementFetcher}
            statementId={props.id}
            statementUserId={props.userId}
          />
        ))}
      </List>
      <Divider />
    </div>
  );

  return <div style={{ width: "100%" }}>{list}</div>;
}
