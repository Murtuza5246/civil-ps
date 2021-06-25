import React, { useState } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Link from "next/link";
import classes from "./indi.module.css";

const SavedIndivisuals = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <Grid container spacing={0}>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container spacing={0} direction="column">
            <Grid item xs={12} md={12} lg={12}>
              <h2>
                <strong>Title:</strong>
                {props.newItem.title}
              </h2>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <div style={{ width: "100%", boxSizing: "border-box" }}>
                <p style={{ boxSizing: "border-box" }}>
                  To view this statement in full screen just click on the eye
                  icon next to it.
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Grid container spacing={0} direction="column">
            <Grid item xs={12} md={12} lg={12}>
              <div className={classes.buttonClass}>
                {props.loading === props.indexItem ? (
                  <Button variant="contained">
                    <CircularProgress size={15} color="primary" />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={props.functionToRemove} //functionToRemove dd this
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <div className={classes.buttonClass}>
                <Link
                  href={`/statement/id/${props.newItem.title
                    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                    .replace(/ /g, "-")}/${props.newItem._id}`}
                >
                  <a>
                    <Button variant="outlined" color="primary">
                      <i class="fas fa-eye"></i>
                    </Button>
                  </a>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
    </div>
  );
};

export default SavedIndivisuals;
