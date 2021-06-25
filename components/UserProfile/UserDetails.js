import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import classes from "./UserDetails.module.css";
import {apiDomain} from "../../apiPath"
import SideNoteBadge from "../qAndA/SideNoteBadge";
import { useSelector } from "react-redux";
import axios from "../axios/axios";
import { useSnackbar } from "notistack";
import Followers from "./Followers";
import AboutInfo from "./About";
import Rating from "./Rating";
import Activity from "./Activity";
import LogInDetails from "./LoginDetails";
import StatementsModal from "./StatementModal";
import Image from "next/image";

const UserDetails = (props) => {
  let user = props.userDetails;
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const userId = useSelector((state) => state.user.userId);
  const email = useSelector((state) => state.user.email);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const authType = useSelector((state) => state.user.authType);
  const token = useSelector((state) => state.user.token);
  const profileImage = useSelector((state) => state.statement.profileImage);
  const width = useMediaQuery("(min-width:500px)");
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const time =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();
  const date =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getFullYear();
  const followersData = {
    email: email,
    name: fName + " " + lName,

    time: time,
    authType,
    date: date,
    userId: userId,
    profileImage,
  };
  const followUnfollow = () => {
    setLoading(true);
    axios
      .patch(`user/follow/unFollow/${user._id}/${userId}`, followersData, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        props.userDetailsFetching();
        setLoading(false);
        enqueueSnackbar(result.data.message, { variant: "success" });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className={classes.mainUserDetailsDiv}>
      <Grid container>
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <div className={classes.imageDiv}>
            <Image
              width="auto"
              height="auto"
              // layout="fill"
              src={
                user._id
                  ? `${apiDomain}/image/profile/${user._id}`
                  : "https://problemspotter.com/hider.png"
              }
              alt={user.fName ? user.fName + " " + user.lName : "Profile image"}
            />
    
          </div>
          {width
            ? (user && user.authType === "Identifier") ||
              (user.authType === "Admin" && (
                <div style={{ marginTop: "20px" }}>
                  <StatementsModal id={user._id} />
                </div>
              ))
            : null}
          {width && (
            <div className={classes.logInDetails}>
              <LogInDetails
                loginData={props.logInDetails ? props.logInDetails : []}
              />
            </div>
          )}
          {/* <div>
            <Rating
              rating={props.rating ? props.rating : {}}
              id={user._id}
              reLoadMe={() => props.userDetailsFetching()}
            />
          </div> */}
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={8}>
          <div className={classes.nameDetailsDiv}>
            <h4>
              {user.fName ? user.fName + " " + user.lName : "Loading..."}

              {user.authType === "Admin" && (
                <SideNoteBadge
                  title="Admin"
                  component={<i className="fas fa-check-circle"></i>}
                />
              )}
              {user.authType === "Professor" && (
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

              {verifiedUsers.filter((item) => item.userId === user._id)
                .length === 1 && (
                <i
                  style={{ color: "blue" }}
                  className="fas fa-check-circle fa-xs"
                ></i>
              )}
            </h4>
            <div>
              <hr />
              <Grid container>
                <hr />
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <div className={classes.buttonMiddleHandle}>
                    <Followers
                      following={user.following ? user.following : []}
                      text="Followers"
                      userDetailsFetching={props.userDetailsFetching}
                      followers={user.followers ? user.followers : []}
                      userId={user._id}
                      disability={
                        user.followers ? user.followers.length === 0 : true
                      }
                      name={user.fName + "-" + user.lName}
                    />
                    {user &&
                      (!loading ? (
                        <Button
                          variant="outlined"
                          onClick={
                            userId
                              ? () => followUnfollow()
                              : () => {
                                  return;
                                }
                          }
                          // disabled={!userId}
                        >
                          {user.followers.filter(
                            (item) => item.userId === userId
                          ).length === 1 ? (
                            <span style={{ color: "green" }}>Following</span>
                          ) : (
                            <span style={{ color: userId ? "blue" : "grey" }}>
                              <strong>
                                {userId ? (
                                  "Follow"
                                ) : (
                                  <a
                                    href="/login"
                                   
                                  >
                                    LogIn to Follow
                                  </a>
                                )}
                              </strong>
                            </span>
                          )}
                        </Button>
                      ) : (
                        <Button>
                          <CircularProgress size={15} color="secondary" />
                        </Button>
                      ))}
                  </div>
                </Grid>
                <Grid item xs={6} md={12} lg={6} xl={6}>
                  <div className={classes.buttonMiddleHandle}>
                    <h4 className={classes.activityLengthTag}>
                      {user.activity ? user.activity.length : "Loading..."}
                    </h4>
                    <span>Activity</span>
                    <Activity
                      name={user.fName + " " + user.lName}
                      data={user.activity ? user.activity : []}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div>
            <AboutInfo
              textObject={props.about}
              userId={user._id}
              userDetailsFetching={props.userDetailsFetching}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={10} lg={10} xl={10}>
          {!width
            ? (user && user.authType === "Identifier") ||
              (user.authType === "Admin" && (
                <div style={{ marginTop: "20px" }}>
                  <StatementsModal id={user._id} />
                </div>
              ))
            : null}
          {!width && (
            <div className={classes.logInDetails}>
              <LogInDetails
                loginData={props.logInDetails ? props.logInDetails : []}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={10} lg={10} xl={10}></Grid>
      </Grid>
    </div>
  );
};

export default UserDetails;
