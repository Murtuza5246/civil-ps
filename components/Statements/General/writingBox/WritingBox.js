import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import classes from "./writingBox.module.css";
import Link from "next/link";
import { apiDomain } from "../../../../apiPath";

const WritingBoxGeneral = (props) => {
  const userId = useSelector((state) => state.user.userId);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const composeHandler = useSelector((state) => state.user.composeHandler);
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
        {composeHandler && (
          <Grid item xs={10} md={11} lg={11} xl={11}>
            <Link href="/compose">
              <div className={classes.writingBoxDiv}>
                <p>
                  Want to share ?.{fName ? " " + fName + " " + lName : null}
                </p>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default WritingBoxGeneral;
