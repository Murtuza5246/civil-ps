import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classes1 from "./search.module.css";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <div className={classes1.searchbarHandler}>
      <Grid container>
        <Grid item xs={10} md={10} lg={10} xl={10}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={classes.root}
            noValidate
            autoComplete="on"
          >
            <TextField
              name="searchValue"
              fullWidth={true}
              //   style={{ width: "300%" }}
              id="outlined-basic"
              label={props.label}
              variant="outlined"
              onChange={(e) => props.onChange(e)}
              value={props.value}
            />
          </form>{" "}
        </Grid>{" "}
        <Grid item xs={2} md={2} lg={2} xl={2}>
          <div className={classes1.iHandler}>
            <i className="fas fa-search"></i>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
