import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CreateIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import classes1 from "./bottomDrawer.module.css";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import TimeAgo from "react-timeago";
import axios from "../axios/axios";
import classes2 from "./answerModal.module.css";
import {
  Badge,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import processString from "react-process-string";
import SideNoteBadge from "./SideNoteBadge";
import Link from "next/link";
import { apiDomain } from "../../apiPath";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const email = useSelector((state) => state.user.email);
  const userId = useSelector((state) => state.user.userId);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const verified = useSelector((state) => state.user.verified);
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const authType = useSelector((state) => state.user.authType);
  const profileImage = useSelector((state) => state.statement.profileImage);
  const [clickAction, setClickAction] = useState(false);
  const [likeClick, setLikeClick] = useState(-1);
  const [uploading, setUploading] = useState(false);
  const matches = useMediaQuery("(max-width:500px)");
  const [answer, setAsnwer] = useState({
    email: email,
    name: fName + " " + lName,
    answer: "",
    profileImage: profileImage,
    userId: userId,
    verified,
  });
  const [comments, setComments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const onChangeEvent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();
    setAsnwer((prevState) => {
      return {
        ...prevState,
        [name]: value,
        time: time,
        date: date,
        profileImage: profileImage,
        authType: authType,
        userId: userId,
        verified,
        questionDetails: props.questionDetails,
      };
    });
  };
  //converting text into links
  let config = [
    {
      regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
      fn: (key, result) => (
        <span key={key}>
          <a
            target="_blank"
            href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}
          >
            {(result[2] + "." + result[3] + result[4]).length > 45
              ? "Click here"
              : result[2] + "." + result[3] + result[4]}
          </a>
        </span>
      ),
    },
    {
      regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
      fn: (key, result) => (
        <span key={key}>
          <a
            target="_blank"
            href={`http://${result[1]}.${result[2]}${result[3]}`}
          >
            {(result[1] + "." + result[2] + result[3]).length > 45
              ? "click here"
              : result[1] + "." + result[2] + result[3]}
          </a>
        </span>
      ),
    },
  ];

  // let stringWithLinks = "hellow there youtube.com";
  // // if (this.state.statement) stringWithLinks = this.state.statement.statement;
  // // let processed = processString(config)(stringWithLinks);
  // converting ends here
  const onCommentsRaisers = (commentId, index) => {
    setLikeClick(index);
    axios
      .patch(`/question/comment/like/${props.id}/${commentId}/${userId}`)
      .then((result) => {
        enqueueSnackbar("Response is submitted");
        setLikeClick(-1);
        statementFetcher();
      })
      .catch((error) => {
        setLikeClick(-1);
        enqueueSnackbar("Error occurred");
      });
  };
  ////
  const submitQuestionHandler = (e, variant) => {
    e.preventDefault();
    if (answer.answer === "") {
      enqueueSnackbar("Please First Write Something");
    } else if (answer.answer.length <= 5) {
      enqueueSnackbar("Too Short");
    } else {
      setUploading(true);
      axios
        .patch("/question/new/answer/" + props.id, answer)
        .then((result) => {
          setUploading(false);

          enqueueSnackbar("Comment Added", { variant });
          statementFetcher();
          setAsnwer((prevState) => {
            return {
              ...prevState,
              answer: "",
            };
          });
        })
        .catch((err) => {
          setUploading(false);
          enqueueSnackbar(err.message);
          console.log(err);
        });
    }
  };
  const [copied, setCopied] = useState(false);
  const onClickToCopy = (id) => {
    navigator.clipboard.writeText("problemspotter.com/qanda?questionId=" + id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  useEffect(() => {
    if (clickAction) statementFetcher();
  }, [clickAction]);
  const fetchByClick = () => {};
  const statementFetcher = () => {
    axios
      .get("/question/getcomments/" + props.id)
      .then((result) => {
        setComments(
          result.data.comments.sort((a, b) =>
            a.vote.length < b.vote.length ? 1 : -1
          )
        );
      })
      .catch();
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    window.history.pushState(null, null, "/qanda?open=true");
    setClickAction(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.history.pushState(null, null, "/qanda");
  };

  return (
    <div>
      <Badge badgeContent={props.comments} color="primary">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleClickOpen("bottom", true, props.id)}
        >
          Comments & Answers
        </Button>
      </Badge>{" "}
      <Button
        onClick={() =>
          window.open(
            "https://pages.razorpay.com/pl_FuFLxwTIE9HYQQ/view",
            "_blank"
          )
        }
      >
        <Tooltip title="Donate us here">
          <FavoriteIcon
            style={{ color: "brown" }}
            className={classes2.donationButtonAnimation}
            onClick={() =>
              window.open(
                "https://pages.razorpay.com/pl_FuFLxwTIE9HYQQ/view",
                "_blank"
              )
            }
          ></FavoriteIcon>
        </Tooltip>
        <Typography className={classes2.donationButton}>Donate</Typography>
      </Button>
      <IconButton onClick={() => onClickToCopy(props.id)}>
        <Tooltip title="Click to copy">
          <ShareIcon />
        </Tooltip>
      </IconButton>
      {copied && (
        <SideNoteBadge title={<Typography>Copied</Typography>}></SideNoteBadge>
      )}
      <Dialog
        fullScreen={matches}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div>
            <h6 style={{ color: "grey" }}>
              {props.question && props.question.substr(0, 30) + "....."}
            </h6>
            <form>
              <InputGroup>
                <Input
                  name="answer"
                  placeholder="write your answer here"
                  onChange={(e) => onChangeEvent(e)}
                  value={answer.answer}
                />{" "}
                <div style={{ width: "5px" }}></div>
                <InputGroupAddon addonType="append">
                  {email && !uploading ? (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!userId}
                      type="submit"
                      onClick={(e) => submitQuestionHandler(e, "success")}
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
                    <Button
                      type="submit"
                      variant="outlined"
                      onClick={props.onClick}
                    >
                      {"    "}LogIn{"    "}
                    </Button>
                  )}
                </InputGroupAddon>
              </InputGroup>
            </form>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div role="presentation">
            <div role="presentation">
              <div>
                {comments.length === 0 && (
                  <div style={{ textAlign: "center", color: "grey" }}>
                    <h4>Be The first to make a comment.</h4>
                  </div>
                )}
              </div>
              <List>
                {comments.map((items, index) => (
                  <div key={new Date().getMilliseconds() * Math.random(1, 100)}>
                    <Grid container>
                      <Grid item xs={2} md={2} lg={2} xl={2}>
                        <Grid container>
                          <Grid item xs={12} md={12} lg={12} xl={12}>
                            <div className={classes2.upArrowHandler}>
                              {" "}
                              <img
                                className={classes1.imageHandler}
                                src={
                                  items.userId
                                    ? `${apiDomain}/image/profile/${items.userId}`
                                    : "hider.png"
                                }
                                alt="profileImage"
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12} lg={12} xl={12}>
                            <div className={classes2.upArrowHandler1}>
                              <Tooltip title="Vote up">
                                <IconButton
                                  disabled={!userId}
                                  onClick={() => {
                                    return items.vote.filter(
                                      (item) => item.userId === userId
                                    ).length === 1
                                      ? enqueueSnackbar("Already Voted")
                                      : onCommentsRaisers(items._id, index);
                                  }}
                                  color={
                                    items.vote.filter(
                                      (item) => item.userId === userId
                                    ).length === 1
                                      ? "primary"
                                      : "inherit"
                                  }
                                >
                                  <Badge
                                    color="secondary"
                                    badgeContent={
                                      items.vote ? items.vote.length : 0
                                    }
                                  >
                                    {likeClick === index ? (
                                      <CircularProgress
                                        size={15}
                                        color="primary"
                                      />
                                    ) : (
                                      <ThumbUpIcon></ThumbUpIcon>
                                    )}
                                  </Badge>
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={10} md={10} lg={10} xl={10}>
                        <div className={classes1.nameTextHandler}>
                          <Grid container>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                              <Grid container>
                                <Grid item xs={12} md={12} lg={8} xl={6}>
                                  <div className={classes2.divBorder}>
                                    <h6>
                                      {items.userId === props.userId ? (
                                        <span
                                          className={classes2.nameBackground}
                                        >
                                          <CreateIcon
                                            style={{ fontSize: "15px" }}
                                          />{" "}
                                          <Link
                                            href={`/user/details/${items.name.replace(
                                              / /g,
                                              "-"
                                            )}/${items.userId}`}
                                          >
                                            <a
                                              className={
                                                classes2.nameTagHandler
                                              }
                                            >
                                              {" "}
                                              {items.name}
                                            </a>
                                          </Link>
                                        </span>
                                      ) : (
                                        <Link
                                          href={`/user/details/${items.name.replace(
                                            / /g,
                                            "-"
                                          )}/${items.userId}`}
                                        >
                                          <a
                                            className={classes2.nameTagHandler}
                                          >
                                            {" "}
                                            {items.name}
                                          </a>
                                        </Link>
                                      )}
                                      {items.authType === "Admin" && (
                                        <SideNoteBadge
                                          title="Admin"
                                          component={
                                            <i className="fas fa-check-circle"></i>
                                          }
                                        />
                                      )}
                                      {items.authType === "Professor" && (
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

                                      {verifiedUsers.filter(
                                        (item) => item.userId === items.userId
                                      ).length === 1 && (
                                        <i
                                          style={{ color: "blue" }}
                                          className="fas fa-check-circle fa-xs"
                                        ></i>
                                      )}
                                    </h6>
                                  </div>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} xl={6}>
                                  <p style={{ color: "grey" }}>
                                    <TimeAgo date={items.date} />
                                  </p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                              <div className={classes2.divBorder}>
                                <p className={classes1.answerHandler}>
                                  {" "}
                                  {/* {items.answer } */}
                                  {processString(config)(items.answer)}
                                  {"  "}
                                </p>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>

                      <hr />
                    </Grid>
                    <hr />
                  </div>
                ))}
              </List>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <i className={classes2.emphasizedCharacters}>
            The highest voted answer will get shifted on top
          </i>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
