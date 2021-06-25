import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import axios from "../axios/axios";
import Instagram from "./Instagram";
import UserDetails from "./UserDetails";
import { useSelector } from "react-redux";
import ChangeInstaProfile from "./ChangeInstaPhoto";
import FacebookPosts from "./FacebookPost";
import { Helmet } from "react-helmet";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import draftToHtml from "draftjs-to-html";
import StatementTable from "./StatementsTable";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function CustomizedDialogs(props) {
  const router = useRouter();
  const [user, setUserDetails] = useState(false);
  const [about, setAbout] = useState(false);
  const [logInDetails, setLogInDetails] = useState([]);
  const [noUser, noUserFound] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    dataFromServer(props.data);
  }, []);
  const dataFromServer = async (data) => {
    try {
      let initialData = await data.userDetails[0];

      if (data.userDetails.length === 0) {
        return noUserFound(true);
      }
      setUserDetails(initialData);
      setLogInDetails(initialData.logInDetails.reverse());

      setAbout(initialData.about);
    } catch {
      return noUserFound(true);
    }
  };
  const userDetailsFetching = () => {
    axios
      .get(`/user/details/${router.query.UserProfilePage}`)
      .then((result) => {
        if (result.data.userDetails.length === 0) {
          return noUserFound(true);
        }
        setUserDetails(result.data.userDetails[0]);
        setLogInDetails(result.data.userDetails[0].logInDetails.reverse());

        setAbout(result.data.userDetails[0].about);
      })
      .catch((err) => {
        noUserFound(true);
        console.log(err);
      });
  };

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  if (noUser) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        <h2>No user found!!</h2>
      </div>
    );
  }
  return (
    <div
      className={classes.profileMainDiv}
      style={{
        paddingTop: "50px",
        textAlign: "center",
        alignContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={10} lg={8} xl={12}>
          <div className={classes.colorDiv}>
            <Card className={classes.root}>
              <UserDetails
                userDetails={user}
                userDetailsFetching={() => userDetailsFetching()}
                about={about}
                rating={user.rating}
                logInDetails={logInDetails}
              />
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={4} xl={12}>
          <div className={classes.colorDiv}>
            <Card className={classes.root}>
              <h5>Social media handles</h5>
              <h6>
                <InstagramIcon />
                <FacebookIcon />
              </h6>
              <hr />
              <Instagram instagram={user.instagram} />
              <div className={classes.changePhotoDiv}>
                {userId === user._id && (
                  <ChangeInstaProfile
                    reLoadMe={() => userDetailsFetching()}
                    action="instagram"
                    placeholder="https://www.instagram.com/p/CBz4znQDiZB/"
                  />
                )}
              </div>
              <br />
              <hr />
              <div className={classes.colorDiv}>
                <Card className={classes.root}>
                  <FacebookPosts facebook={user.facebook} />
                  {userId === user._id && (
                    <ChangeInstaProfile
                      reLoadMe={() => userDetailsFetching()}
                      action="facebook"
                      placeholder="https://www.facebook.com/DatabaseOfCivilConstructionProblems"
                    />
                  )}
                </Card>
              </div>
            </Card>
          </div>
        </Grid>
        <Grid item xs={4} md={2} lg={4} xl={4}></Grid>
      </Grid>

      <div id="fb-root"></div>
    </div>
  );
}

CustomizedDialogs.getInitialProps = ({ query }) => {
  return { query };
};

export default CustomizedDialogs;
