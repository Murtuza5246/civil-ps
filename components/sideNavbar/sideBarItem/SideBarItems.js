import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import { AccordionSummary } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import WorkIcon from "@material-ui/icons/Work";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import classes from "./SideBarItem.module.css";
import * as actionCreator from "../../../redux/actions/index";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    // backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export default function SideBarItems(props) {
  const [expanded, setExpanded] = React.useState("panel2");
  const despatch = useDispatch();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const userId = useSelector((state) => state.user.userId);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const canApprove = useSelector((state) => state.user.canApprove);
  const logoutFunc = (dispatch) => {
    props.onClick("right", false);
    dispatch(actionCreator.logout());
  };

  return (
    <div className={classes.expansePan}>
      <div className={classes.nestedFirstDiv}>
        <ExpansionPanel
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography>
              <AccountBoxIcon />
              {"   "}
              Account
            </Typography>
          </ExpansionPanelSummary>
          <>
            <div className={classes.LinksHandler}>
              {!userId && (
                <Link href="/login">
                  <a>
                    <div
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                      className={classes.ListeItems}
                    >
                      Login
                    </div>
                  </a>
                </Link>
              )}
              {!userId && (
                <Link href="/signup">
                  <a>
                    <div
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                      className={classes.ListeItems}
                    >
                      SignUp
                    </div>
                  </a>
                </Link>
              )}
              {userId && (
                <Link href={`/user/details/${fName + "-" + lName}/${userId}`}>
                  <a>
                    <div
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                      className={classes.ListeItems}
                    >
                      My Account
                    </div>
                  </a>
                </Link>
              )}
              {userId && (
                <Link
                  
                  href="/statements"
                >
                  <a onClick={
               
                       () => despatch(actionCreator.logout())
                  }>
                    <div
                      className={classes.ListeItems}
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                    >
                      LogOut
                    </div>
                  </a>
                </Link>
              )}
            </div>
          </>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <ExpansionPanelSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography>
              <ViewHeadlineIcon />
              {"   "}
              Statement
            </Typography>
          </ExpansionPanelSummary>

          <>
            <div className={classes.LinksHandler}>
              <Link href="/statements">
                <a>
                  <div
                    onClick={
                      props.onClick ? () => props.onClick("right", false) : null
                    }
                    className={classes.ListeItems}
                  >
                    Statements
                  </div>
                </a>
              </Link>
              {/* <div className={classes.ListeItems}>
                <Link to="/recent-statements">Recent Statements</Link>
              </div> */}
              {userId && (
                <Link href="/saved-statements?open=true">
                  <a>
                    <div
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                      className={classes.ListeItems}
                    >
                      Saved Statements
                    </div>
                  </a>
                </Link>
              )}
            </div>
          </>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography>
              <WorkIcon />
              {"   "}
              Activity
            </Typography>
          </ExpansionPanelSummary>
          <div>
            <div className={classes.LinksHandler}>
              <Link href="/">
                <a>
                  <div
                    onClick={
                      props.onClick ? () => props.onClick("right", false) : null
                    }
                    className={classes.ListeItems}
                  >
                    Home
                  </div>
                </a>
              </Link>
              <Link href="/qanda">
                <a>
                  <div
                    onClick={
                      props.onClick ? () => props.onClick("right", false) : null
                    }
                    className={classes.ListeItems}
                  >
                    Q&A <i className="fas fa-fire"></i>
                  </div>
                </a>
              </Link>
              <Link href="/live">
                <a>
                  <div
                    onClick={
                      props.onClick ? () => props.onClick("right", false) : null
                    }
                    className={classes.ListeItems}
                  >
                    Live
                  </div>
                </a>
              </Link>
              {canApprove && (
                <Link href="/new/pending/statements?open=true">
                  <a>
                    <div
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                      className={classes.ListeItems}
                    >
                      Pending Statements
                    </div>
                  </a>
                </Link>
              )}
              {canApprove && (
                <Link href="/activity/approved">
                  <a>
                    <div
                      onClick={
                        props.onClick
                          ? () => props.onClick("right", false)
                          : null
                      }
                      className={classes.ListeItems}
                    >
                      Approved Statements
                    </div>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <ExpansionPanelSummary
            aria-controls="panel5d-content"
            id="panel5d-header"
          >
            <div className={classes.iconsHandler}>
              <h6>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>Connect
              </h6>
            </div>
          </ExpansionPanelSummary>
          <>
            <div className={classes.LinksHandler}>
              <a
                href="https://www.instagram.com/problemspotter/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={classes.ListeItems}>
                  <i className="fab fa-instagram"></i>
                </div>
              </a>
              <a
                href="https://www.facebook.com/DatabaseOfCivilConstructionProblems"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={classes.ListeItems}>
                  <i className="fab fa-facebook"></i>
                </div>
              </a>
              <a
                href="https://www.youtube.com/channel/UCjyxaLUj3k3V0cZGGVBRPjw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={classes.ListeItems}>
                  <i className="fab fa-youtube"></i>
                </div>
              </a>
            </div>
          </>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography>
              {"   "}
              <FavoriteIcon />
              Donate
              <FavoriteIcon />
            </Typography>
          </ExpansionPanelSummary>
          <>
            <Typography className={classes.ListeItems}>
              <a
                href="https://pages.razorpay.com/pl_FuFLxwTIE9HYQQ/view"
                target="black"
                className={classes.donateAnchorTag}
              >
                <div className={classes.donateAnchorTag}>
                  <FavoriteIcon /> Donate here
                </div>
              </a>
            </Typography>
          </>
        </ExpansionPanel>
      </div>
    </div>
  );
}
