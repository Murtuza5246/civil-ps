import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputGroup, InputGroupAddon } from "reactstrap";
import axios from "../axios/axios";
import Button from "@material-ui/core/Button";
import classes1 from "./qanda.module.css";
import {
  Grid,
  Badge,
  Tooltip,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Likers from "./Likers";
import Footer from "../Footer/Footer";
import SwipeableTemporaryDrawer from "./answerModal";
import { useSnackbar } from "notistack";
import PanToolIcon from "@material-ui/icons/PanTool";
import MetaTags from "react-meta-tags";
import Link from "next/link";
import LoginModal from "../loginModal/LoginModal";
import * as actionCreator from "../../redux/actions/index";
import Backdrop from "../BackDropFile/BackDrop";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SideNoteBadge from "./SideNoteBadge";
import TextEditor from "./TextEditor/TextEditor";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import draftToHtml from "draftjs-to-html";
import TimeAgo from "react-timeago";
import "draft-js-mention-plugin/lib/plugin.css";
import { Markup } from "interweave";
import ScrollTopArrow from "./ScrollTopArrao";
import classes from "./qanda.module.css";
import PlaceholderExamplePlaceholder from "../Statements/PlaceHolder";
import { apiDomain } from "../../apiPath";
// import PushNotification from "../cookieNoti/PushNotification";

export default function QandA(props) {
  const [questions, setQuestions] = useState([]);
  const [collapse, setCollapse] = useState(false);
  // const [likeData, setLikeData] = useState({});
  const email = useSelector((state) => state.user.email);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const authType = useSelector((state) => state.user.authType);
  const [questionId, setQuestionId] = useState(null);
  const message = useSelector((state) => state.user.credentialCheck);
  const userId = useSelector((state) => state.user.userId);
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const token = useSelector((state) => state.user.token);
  const profileImage = useSelector((state) => state.statement.profileImage);

  const dispatch = useDispatch();

  const fetchQueryParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const questionIdMain = urlParams.get("questionId");

    setQuestionId(questionIdMain);
  };
  useEffect(() => {
    fetchQueryParams();
    console.log(window);
  }, []);
  useEffect(() => {
    dispatch(actionCreator.authCheckStatus());
  }, [userId, token, profileImage, email, fName, lName]);
  useEffect(() => {
    if (questionId && questions.length !== 0) {
      let selectedObject = questions.filter((item) => item._id === questionId);

      let onlyObject = selectedObject[0];
      questions.unshift(onlyObject);
    }
  }, [questionId, questions]);
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    email: "",
    password: "",
    userData: null,
    checkAlert: true,
    disabledButton: false,
  });
  const [answerModal, setAnswerModal] = useState(false);
  const [NothingtoShow, setNothingToSow] = useState(false);
  const [backDropLoader, setBackDropLoader] = useState(true);
  const [gettingData, setGettingData] = useState(false);
  const [questionUploadClick, setQuestionUploadClick] = useState(false);
  const [panToolClick, setPanToolClick] = useState(-1);
  const [loading, setLoading] = useState(-1);
  const [following, setFollowings] = useState([]);
  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(actionCreator.authCheckStatus());
    dispatch(actionCreator.newAuthStart(state.email, state.password));
    if (message) {
      enqueueSnackbar(message);
    }
    setTimeout(() => {
      if (email) {
        dispatch(actionCreator.authCheckStatus());
      }
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    questionFetching();
  }, []);

  const questionFetching = () => {
    axios
      .get("/question/comments")
      .then((result) => {
        setQuestions(result.data.data.reverse());
        if (result.data.data.length === 0) {
          setNothingToSow(true);
        }
        if (result.data.data.length !== 0) {
          setNothingToSow(false);
        }
        setBackDropLoader(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.message);
        setBackDropLoader(false);
        setNothingToSow(true);
      });
  };
  const likeHandler = (questionId, index) => {
    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();
    const likeData = {
      email: email,
      name: fName + " " + lName,

      time: time,
      authType,
      date: date,
      userId: userId,
      profileImage,
    };

    if (userId && token && fName && lName && email && profileImage) {
      const audio = new Audio("/click.mp3");
      const alreadyClicked = new Audio("/alreadyClicked.mp3");
      setPanToolClick(index);
      axios
        .patch(`/question/likes/${questionId}/${userId}`, likeData, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((result) => {
          if (result.data.message === "Liked") {
            setPanToolClick(-1);
            audio.play();
            enqueueSnackbar("You have raised your hand", {
              variant: "success",
            });
          } else {
            setPanToolClick(-1);
            alreadyClicked.play();
            enqueueSnackbar(result.data.message);
          }
          questionFetching();
        })
        .catch((err) => {
          setPanToolClick(-1);
          console.log(err);
        });
    }
  };

  const openAnswerModal = (e) => {
    e.preventDefault();
    setAnswerModal(!answerModal);
  };
  useEffect(() => {
    followingFetcher();
  }, [userId]);
  const followingFetcher = () => {
    if (userId) {
      axios
        .get("/user/details/" + userId)
        .then((result) => {
          setFollowings(result.data.userDetails[0].following);
          setLoading(-1);
          setLoading(false);
        })
        .catch((err) => {
          this.setState({ userDetails: "" });
          console.log(err);
        });
    }
  };

  ///////////////////////////
  const submitQuestionHandler = (objectData, mentionsData) => {
    if (true) {
      if (objectData.blocks[0].text === "") {
        enqueueSnackbar("Question can not be blank!");

        return;
      }

      const time =
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds();
      const date = new Date();
      let newData = {
        email: email,
        name: fName + " " + lName,
        profileImage,
        time: time,
        date: date,
        userId: userId,
        questionAsked: JSON.stringify(objectData),
        mentions: JSON.stringify(mentionsData),
      };
      setQuestionUploadClick(true);

      axios
        .post("/question/new/ask", newData)
        .then((result) => {
          setCollapse(false);
          setQuestionUploadClick(false);
          enqueueSnackbar(result.data.message, { variant: "success" });
          questionFetching("success");
          setGettingData(!gettingData);
        })
        .catch((err) => {
          setCollapse(false);
          setQuestionUploadClick(false);
          setGettingData(!gettingData);
          enqueueSnackbar(err.message);
          console.log(err);
        });
    }
  };

  const onSubmitFollow = (id, index) => {
    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();
    const followersData = {
      email: email,
      name: fName + " " + lName,

      time: time,
      authType,
      date: date,
      userId: userId,
      profileImage,
    };

    setLoading(index);

    axios
      .patch(`user/follow/unFollow/${id}/${userId}`, followersData, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        followingFetcher();
        enqueueSnackbar("Followed", { variant: "success" });
      })
      .catch((err) => {
        setLoading(-1);
        enqueueSnackbar(err);
        console.log(err);
      });
  };

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
        entity.data.url
      }</a>`;
    } else {
      return;
    }
  };
  const gettingDataClicker = () => {
    setGettingData(!gettingData);
  };
  const textEditorError = () => {
    try {
      return (
        <TextEditor
          submitQuestionHandler={(data, mentionsData) =>
            submitQuestionHandler(data, mentionsData)
          }
          gettingData={gettingData}
        >
          {" "}
          <Typography>
            Write your thoughts below.
            <span style={{ color: "grey", fontSize: "15px" }}>
              You can mention someone by just adding "@".
            </span>
            <hr />
          </Typography>
        </TextEditor>
      );
    } catch {
      return <div>textEditor error;;</div>;
    }
  };
  let dataShow = null;
  if (backDropLoader) {
    dataShow = (
      <div className={classes1.scrollDiv}>
        <PlaceholderExamplePlaceholder />
        <PlaceholderExamplePlaceholder />
        <PlaceholderExamplePlaceholder />
        <PlaceholderExamplePlaceholder />
      </div>
    );
  } else {
    dataShow = (
      <div id="myDiv" className={classes1.scrollDiv}>
        {NothingtoShow ? (
          <div>
            <h2>Nothing to show!</h2>{" "}
            <p>You can start asking your question here.</p>
          </div>
        ) : null}
        <div className={classes1.animationDiv}>
          {questions.map((items, index) => (
            <div
              key={items._id + Math.random(0, 100)}
              className={
                items._id === questionId &&
                index === 0 &&
                classes1.selectedQuestion
              }
            >
              <Grid container spacing={4}>
                <hr />

                <Grid item xs={2} md={2} lg={1} xl={2}>
                  <Grid container>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <div>
                        <img
                          className={classes.nestedImage}
                          src={
                            items.userId
                              ? `${apiDomain}/image/profile/${items.userId}`
                              : "hider.png"
                          }
                          alt="image_profile"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <div className={classes1.handPosition}>
                        <Tooltip
                          title={
                            items.likes.filter((item) => item.userId === userId)
                              .length === 1
                              ? "You have raised your hand for this question"
                              : userId
                              ? "Raise Hand"
                              : "Login to raise hand"
                          }
                        >
                          <span>
                            <IconButton
                              color={
                                items.likes.filter(
                                  (item) => item.userId === userId
                                ).length === 1
                                  ? "primary"
                                  : "inherit"
                              }
                              aria-label="add an alarm"
                              onClick={() => {
                                return items.likes.filter(
                                  (item) => item.userId === userId
                                ).length === 1
                                  ? enqueueSnackbar("Hand is already raised")
                                  : likeHandler(items._id, index);
                              }}
                              disabled={!userId}
                            >
                              <Badge
                                color="secondary"
                                badgeContent={items.likes.length}
                              >
                                {panToolClick === index ? (
                                  <CircularProgress
                                    size={15}
                                    color="secondary"
                                  />
                                ) : (
                                  <PanToolIcon />
                                )}
                              </Badge>
                            </IconButton>
                          </span>
                        </Tooltip>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <div className={classes1.likesButtonHandler}>
                        <Likers likes={items.likes} />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <div className={classes1.bookmarkButton}>
                        <IconButton disabled={!userId}>
                          <Tooltip title="Coming soon">
                            <BookmarkBorderIcon
                              onClick={() => enqueueSnackbar("Coming soon")}
                            ></BookmarkBorderIcon>
                          </Tooltip>
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} md={10} lg={11} xl={10}>
                  <Grid container direction="row" spacing={0}>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <p className={classes1.imageBorderDiv}>
                        <strong>
                          <Link
                            href={`/user/details/${items.uploadedByName.replace(
                              / /g,
                              "-"
                            )}/${items.userId}`}
                          >
                            <a className={classes1.nameTagHandler}>
                              {items.uploadedByName.substr(0, 18)}
                              {items.uploadedByName.length > 18 && "..."}
                            </a>
                          </Link>
                        </strong>
                        {items.authType === "Admin" && (
                          <SideNoteBadge
                            title="Admin"
                            component={<i className="fas fa-check-circle"></i>}
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
                        ).length === 1 &&
                          items.authType !== "Admin" && (
                            <i
                              style={{ color: "blue" }}
                              className="fas fa-check-circle fa-xs"
                            ></i>
                          )}
                        {/* {loading === index ? ( */}
                        <Button
                          onClick={
                            userId
                              ? () => onSubmitFollow(items.userId, index)
                              : () => {
                                  return;
                                }
                          }
                          // disabled={!userId}
                        >
                          {loading === index ? null : (
                            <span>
                              {following.filter(
                                (item) => item.userId === items.userId
                              ).length === 1 ? null : (
                                <span
                                  style={{
                                    color: userId ? "blue" : "grey",
                                    fontSize: "10px",
                                  }}
                                >
                                  {userId ? "Follow" : null}
                                </span>
                              )}
                            </span>
                          )}
                          {loading === index && (
                            <CircularProgress size={15} color="secondary" />
                          )}
                        </Button>
                      </p>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4} xl={4}>
                      <p style={{ color: "grey" }}>{items.time}</p>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4} xl={4}>
                      <p style={{ color: "grey" }}>
                        <TimeAgo date={items.date} />
                      </p>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                      <h6 className={classes1.imageBorderDiv}>
                        {/* {processString(config)(
                              draftToHtml(JSON.parse(items.question))
                            )} */}
                        <Markup
                          content={draftToHtml(
                            JSON.parse(items.question),
                            {},
                            false,
                            customEntityTransform
                          )}
                        />

                        {(items.authType === "Admin" ||
                          items.authType === "Identifier") && (
                          <i
                            style={{
                              fontSize: "1rem",
                              color: "#d92027",
                              position: "relative",
                              bottom: "1px",
                            }}
                            className="fas fa-user-tie"
                          ></i>
                        )}
                      </h6>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <Grid container>
                        <Grid item xs={12} lg={12} md={12} xl={12}>
                          <div>
                            <SwipeableTemporaryDrawer
                              question={"Write your thoughts on this."}
                              id={items._id}
                              userId={items.userId}
                              comments={items.comments.length}
                              emailValue={state.email}
                              onEmailChange={onInputChangeHandler}
                              passwordValue={state.password}
                              onPasswordChange={onInputChangeHandler}
                              onButtonClick={(e) => onSubmitHandler(e)}
                              disabledButton={state.disabledButton}
                              alertMessage={message}
                              onClick={(e) => openAnswerModal(e)}
                              questionDetails={items}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <hr
                  style={{
                    borderBottom: "0.6px solid grey",
                    width: "100%",
                  }}
                />
              </Grid>
            </div>
          ))}
          <ScrollTopArrow />
        </div>
      </div>
    );
  }
  return (
    <div className={classes1.mainDiv}>
      <MetaTags>
        <title>{"Problemspotter - Question and answers"}</title>
        <meta
          id="meta-description"
          name="description"
          content={
            "Top civil engineering projects & construction site facing daily problems listed here. This website is specially design to educate student about current scenario of construction site."
          }
        />
        <meta
          id="og-title"
          property="og:title"
          content={
            "Top civil engineering problems answered by industry experts"
          }
        />

        <meta
          id="og-image"
          property="og:image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        <meta property="og:site_name" content="problemspotter" />

        <meta
          property="og:description"
          content={
            "Problemspotter - " + questions.length > 0 && questions[0].question
          }
        />
        <meta
          property="og:image"
          itemprop="image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        <meta
          name="msapplication-TileImage"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        ></meta>
        <meta property="og:type" content="website" />
        <meta property="og:updated_time" content="1440432930" />
        <meta
          property="og:url"
          content={"https://civil.problemspotter.com/qanda"}
        ></meta>
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta property="og:image:height" content="300"></meta>
        <meta
          name="twitter:title"
          content={
            "Problemspotter - " + questions.length > 0 && questions.question
          }
        />
        <meta
          name="twitter:description"
          content={questions.length > 0 && questions[0].question}
        />
        <meta
          name="twitter:image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        <meta name="twitter:card" content="summary" />
      </MetaTags>
      <div className={classes1.root}>
        <div className={classes1.section1}>
          <div className={classes1.firstNestedDiv}>
            <Grid container>
              {fName && "@" + fName + " " + lName}
              <Grid item xs={12} md={12} lg={12} xl={12}>
                {collapse && textEditorError()}

                <InputGroup>
                  <InputGroupAddon addonType="append">
                    {email && !questionUploadClick ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!email || !collapse}
                        onClick={() => gettingDataClicker()}
                      >
                        {"    "}ASK{"    "}
                      </Button>
                    ) : (
                      email && (
                        <Button variant="contained">
                          <CircularProgress size={15} color="secondary" />
                        </Button>
                      )
                    )}
                    {!email && (
                      <LoginModal
                        emailValue={state.email}
                        onEmailChange={onInputChangeHandler}
                        passwordValue={state.password}
                        onPasswordChange={onInputChangeHandler}
                        onButtonClick={(e) => onSubmitHandler(e)}
                        disabledButton={state.disabledButton}
                        alertMessage={message}
                        openModal={answerModal}
                      />
                    )}
                    <Tooltip title="Collapse">
                      <Button onClick={() => setCollapse(!collapse)}>
                        <SwapVerticalCircleIcon
                          style={{ color: !collapse ? "#005086" : "grey" }}
                        />
                      </Button>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <hr />
              </Grid>
            </Grid>

            {dataShow}
          </div>
        </div>
      </div>
      {/* <PushNotification title={"Hellow there"} body={"hello body"} /> */}
      <Footer />
    </div>
  );
}
