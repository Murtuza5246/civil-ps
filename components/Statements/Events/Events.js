import { Button, CircularProgress, Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PlaceholderExamplePlaceholder from "./Placeholder/Placeholder";
import classes from "./events.module.css";
import { Img } from "react-image";
import StatementModal from "../UserStatements/StatementModal";

import Draggable from "react-draggable";
import { apiDomain } from "../../../apiPath";

const Events = (props) => {
  const [recentStatements, setRecentStatements] = useState([]);
  const [allStatements, setAllStatements] = useState([]);
  const [allIdentifier, setAllIdentifier] = useState([]);
  const [topIdentifierCount, setTopIdentifierCount] = useState([]);
  useEffect(() => {
    shuffle(props.recentStatements);
    setAllStatements(props.allStatements);

    totalIdentifierCount(props.allStatements);
  }, [props.recentStatements, props.allStatements]);

  useEffect(() => {
    countHighestStatement();
  }, [allIdentifier]);
  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    setRecentStatements(array);
  };

  const totalIdentifierCount = (all) => {
    var obj = {};

    for (var i = 0, len = all.length; i < len; i++)
      obj[all[i]["userId"]] = all[i];

    let newAllStatements = new Array();
    for (var key in obj) newAllStatements.push(obj[key]);

    return setAllIdentifier(newAllStatements);
  };
  const countHighestStatement = () => {
    let newObject = [];
    for (let i = 0; i < allIdentifier.length; i++) {
      let current = {
        id: i,
        name: allIdentifier[i].identifier,
        userId: allIdentifier[i].userId,
        statements: allStatements.filter(
          (item) => item.userId === allIdentifier[i].userId
        ),
      };
      newObject.push(current);
    }
    setTopIdentifierCount(
      newObject.sort((a, b) =>
        a.statements.length < b.statements.length ? 1 : -1
      )
    );
  };

  return (
    <div className={classes.eventsManagerDivTop}>
      {/* <Draggable> */}
      <div className={`${classes.eventsManagerDiv} "cursor"`}>
        <div className={classes.eventsHeadingDiv}>
          <h3>Recent statements</h3>
        </div>
        <div className={classes.recentStatementsTopDiv}>
          {recentStatements.length !== 0 ? (
            <Grid container spacing={1}>
              {recentStatements.map((item) => (
                <>
                  <Grid item md={2} lg={1} xl={1}>
                    <Link
                      href={`/user/details/${item.identifier.replace(
                        / /g,
                        "-"
                      )}/${item.userId}`}
                    >
                      <a>
                        <Tooltip title={item.identifier}>
                          <Img
                            className={classes.uploaderImage}
                            src={`${apiDomain}/image/profile/${item.userId}`}
                            loader={<CircularProgress size={10} />}
                          />
                        </Tooltip>
                      </a>
                    </Link>
                  </Grid>
                  <Grid item md={10} lg={11} xl={11}>
                    <div
                      style={{ marginLeft: "8px" }}
                      className={classes.eventTopIdentifierDiv}
                    >
                      <h3>
                        <Link
                          href={`/statement/id/${item.title
                            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                            .replace(/ /g, "-")}/${item._id}`}
                        >
                          <a>
                            {item.title.length > 65
                              ? item.title.substr(0, 60) + "..."
                              : item.title}
                          </a>
                        </Link>
                      </h3>
                    </div>
                  </Grid>
                </>
              ))}
            </Grid>
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              <PlaceholderExamplePlaceholder />
              <PlaceholderExamplePlaceholder />
              <PlaceholderExamplePlaceholder />
              <PlaceholderExamplePlaceholder />
            </div>
          )}
        </div>
      </div>
      {/* </Draggable> */}
      <Draggable>
        <div className={classes.eventsManagerDiv}>
          <div className={classes.eventsHeadingDiv}>
            <h3>Top Identifiers</h3>
          </div>
          <div className={classes.recentStatementsTopDiv}>
            {topIdentifierCount.length !== 0 ? (
              <Grid container spacing={1}>
                {topIdentifierCount.slice(0, 6).map((item, index) => (
                  <>
                    <Grid item md={2} lg={1} xl={1}>
                      <Tooltip title={item.name}>
                        <Link
                          href={`/user/details/${item.name.replace(
                            / /g,
                            "-"
                          )}/${item.userId}`}
                        >
                          <Img
                            className={classes.uploaderImage}
                            src={`${apiDomain}/image/profile/${item.userId}`}
                            loader={<CircularProgress size={10} />}
                          />
                        </Link>
                      </Tooltip>
                    </Grid>
                    <Grid item md={8} lg={9} xl={9}>
                      <div className={classes.eventTopIdentifierDiv}>
                        <h3>
                          <Link
                            href={`/user/details/${item.name.replace(
                              / /g,
                              "-"
                            )}/${item.userId}`}
                          >
                            <a>{item.name}</a>
                          </Link>
                        </h3>
                        <span>
                          <StatementModal
                            numberOfStatements={item.statements.length}
                            statements={item.statements}
                          />
                        </span>
                      </div>
                    </Grid>

                    <Grid item md={2} lg={2} xl={2}>
                      <div className={classes.shadowForRankingColors}>
                        <span style={{ color: "grey" }}>
                          {" "}
                          <i> #{index + 1 + " "}</i>
                        </span>

                        <Tooltip
                          title={
                            index === 0
                              ? "diamond"
                              : index === 1
                              ? "golden"
                              : index === 2
                              ? "silver"
                              : index === 3
                              ? "platinum"
                              : "bronze"
                          }
                        >
                          <i
                            className="fas fa-crown"
                            style={{
                              color:
                                index === 0
                                  ? "#b9f2ff"
                                  : index === 1
                                  ? "#ffa62b"
                                  : index === 2
                                  ? "#C0C0C0"
                                  : index === 3
                                  ? "#e5e4e2"
                                  : "#cd7f32",
                            }}
                          ></i>
                        </Tooltip>
                      </div>
                    </Grid>
                  </>
                ))}
              </Grid>
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <PlaceholderExamplePlaceholder />
                <PlaceholderExamplePlaceholder />
                <PlaceholderExamplePlaceholder />
                <PlaceholderExamplePlaceholder />
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Events;
