import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Grid } from "@material-ui/core";
import classes1 from "./followers.module.css";
import SideNoteBadge from "../qAndA/SideNoteBadge";
import { apiDomain } from "../../apiPath";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.followers.map((items) => (
          <div key={items.userId}>
            <Grid container>
              <Grid item xs={3} md={3} lg={2} xl={3}>
                <img
                  className={classes1.likesImage}
                  src={
                    items.profileImage
                      ? `${apiDomain}/image/profile/${items.userId}`
                      : "/hider.png"
                  }
                  alt="image_profile"
                />
              </Grid>
              <Grid item xs={9} md={9} lg={10} xl={9}>
                <div className={classes1.nameAlignMent}>
                  <h6>
                    <strong>
                      <Link
                        href={`/user/details/${items.name.replace(/ /g, "-")}/${
                          items.userId
                        }`}
                      >
                        <a className={classes1.nameTagHandler}>
                          {items.name.substr(0, 18)}
                          {items.name.length > 18 && "..."}
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
                    ).length === 1 && (
                      <i
                        style={{ color: "blue" }}
                        className="fas fa-check-circle"
                      ></i>
                    )}
                  </h6>
                  {items.email && (
                    <h6 style={{ color: "grey" }}>
                      {(
                        items.email.substr(0, 3) +
                        "*****" +
                        items.email.substr(10, 30)
                      )
                        .replace("@", "*")
                        .replace(new RegExp("[0-9]", "g"), "*")}
                    </h6>
                  )}
                </div>
              </Grid>
            </Grid>
            <hr />
          </div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.following.map((items) => (
          <div key={items.userId}>
            <Grid container>
              <Grid item xs={3} md={3} lg={2} xl={3}>
                <img
                  className={classes1.likesImage}
                  src={
                    items.userId
                      ? `${apiDomain}/image/profile/${items.userId}`
                      : "/hider.png"
                  }
                  alt="image_profile"
                />
              </Grid>
              <Grid item xs={9} md={9} lg={10} xl={9}>
                <div className={classes1.nameAlignMent}>
                  <h6>
                    <strong>
                      <Link
                        href={`/user/details/${items.name.replace(/ /g, "-")}/${
                          items.userId
                        }`}
                      >
                        <a className={classes1.nameTagHandler}>
                          {items.name.substr(0, 18)}
                          {items.name.length > 18 && "..."}
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
                    ).length === 1 && (
                      <i
                        style={{ color: "blue" }}
                        className="fas fa-check-circle"
                      ></i>
                    )}
                  </h6>
                  {items.email && (
                    <h6 style={{ color: "grey" }}>
                      {(
                        items.email.substr(0, 3) +
                        "*****" +
                        items.email.substr(10, 30)
                      )
                        .replace("@", "*")
                        .replace(new RegExp("[0-9]", "g"), "*")}
                    </h6>
                  )}
                </div>
              </Grid>
            </Grid>
            <hr />
          </div>
        ))}
      </TabPanel>
    </div>
  );
}
