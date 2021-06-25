import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Link from "next/link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TimeAgo from "react-timeago";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.Approved.map((items) => (
        <ExpansionPanel
          key={Math.random(1, 100) * new Date().getMilliseconds()}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <strong> TITLE:{"  "}</strong>

              {items.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ width: "100%" }}>
              <Grid container>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <h6>History</h6>
                  <hr />
                </Grid>
                <hr />
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Grid container>
                    <Grid item xs={5} md={5} lg={5} xl={5}>
                      <Grid container direction="column">
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          {" "}
                          <h6>UPLOAD</h6>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <strong>{<TimeAgo date={items.date} />}</strong>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <strong>{items.time}</strong>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={5} md={5} lg={5} xl={5}>
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        {" "}
                        <h6>ACTION</h6>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <strong>
                          {<TimeAgo date={items.actionAdminDate} />}:
                        </strong>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <strong> {items.actionAdminTime}</strong>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2} xl={2}>
                      <Link
                        href={`/statement/id/${items.title
                          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                          .replace(/ /g, "-")}/${items._id}`}
                      >
                        <a>
                          <i className="fas fa-eye"></i>
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
