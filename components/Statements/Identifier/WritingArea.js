import classes from "./writingArea.module.css";
import React from "react";
import { Grid } from "@material-ui/core";
import WritingModal from "./writingModal/WritingModal";
import { useSelector } from "react-redux";
import { apiDomain } from "../../../apiPath";

const WritingArea = (props) => {
  const userId = useSelector((state) => state.user.userId);
  return (
    <div className={classes.mainDivWritingArea}>
      <Grid container>
        <Grid item xs={2} md={1} lg={1} xl={1}>
          <img
            src={
              userId
                ? `${apiDomain}/image/profile/${userId}`
                : "/hider.png"
            }
            className={classes.imageIdentifer}
            alt="profile"
          />
        </Grid>
        <Grid item xs={10} md={11} lg={11} xl={11}>
          <WritingModal fetchData={props.fetchData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default WritingArea;
