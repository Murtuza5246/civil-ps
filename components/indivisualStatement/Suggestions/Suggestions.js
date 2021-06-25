import { Button, Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "./suggestions.module.css";
import Link from "next/link";
import axios from "../../axios/axios";
import { TrainOutlined, TramOutlined } from "@material-ui/icons";
import { apiDomain } from "../../../apiPath";

const Suggestions = (props) => {
  const [relatedData, setRelatedData] = useState([]);
  const [buttonText, setButtonText] = useState(false);
  const [secondSlice, setSecondSlice] = useState(4);

  useEffect(() => {
    fetchRelatedSearches(props.fields, props.id);
  }, [props.fields]);

  const fetchRelatedSearches = (fields, id) => {
    axios
      .post("/statements/getSearchedFields", fields)
      .then((result) => {
        shuffle(result.data.filter((el) => el._id !== id));
      })
      .catch();
  };
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
    setRelatedData(array);
  };
  const clickShowMoreButton = () => {
    setButtonText(!buttonText);
    if (!buttonText) {
      setSecondSlice(relatedData.length);
    } else {
      setSecondSlice(4);
    }
  };
  if (relatedData.length === 0) {
    return null;
  }
  return (
    <div className={classes.suggestionTopDiv}>
      <h3>Related searches:</h3>
      <div className={classes.suggestionsFirstNestedDiv}>
        <Grid container spacing={4}>
          {relatedData.slice(0, secondSlice).map((item) => (
            <>
              <Grid item xs={2} md={2} lg={1} xl={1}>
                <Tooltip title={item.identifier}>
                  <img
                    src={`${apiDomain}/image/profile/${item.userId}`}
                    alt="uploader"
                    className={classes.uploaderImage}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={10} md={10} lg={11} xl={11}>
                <h3>
                  <Link
                    href={`https://civil.problemspotter.com/statement/id/${item.title
                      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                      .replace(/ /g, "-")}/${item._id}`}
                  >
                    <a target="blank">{item.title}</a>
                  </Link>
                </h3>
              </Grid>
            </>
          ))}
          <div style={{ width: "100%", textAlign: "center" }}>
            {relatedData.length > 5 && <hr className={classes.ButtonHr} />}
            {relatedData.length > 5 && (
              <Button
                className={classes.showMoreButton}
                color="primary"
                variant="contained"
                onClick={clickShowMoreButton}
              >
                {buttonText ? "see less" : "see more"}
              </Button>
            )}
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Suggestions;
