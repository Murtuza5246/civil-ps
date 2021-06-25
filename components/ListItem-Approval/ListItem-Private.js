import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Tooltip } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../axios/axios";
import Spinner from "../UI/Spinner/Spinner";
import { useSnackbar } from "notistack";
import MetaTags from "react-meta-tags";
import RejectConfirmation from "./RectConfirmation";
import { apiDomain } from "../../apiPath";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ListItemPrivate = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const email = useSelector((state) => state.user.email);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const userId = useSelector((state) => state.user.userId);

  const canApprove = useSelector((state) => state.user.canApprove);
  const token = useSelector((state) => state.user.token);
  const authType = useSelector((state) => state.user.authType);
  const { enqueueSnackbar } = useSnackbar();
  const approveDisapprove = {
    emailOfApprover: email,
    nameOfApprover: fName + " " + lName,
    dateOfApprover: new Date(),
    timeOfApprover: new Date().toLocaleTimeString(),
    email: props.email,
    name: props.name,
    userId,
    statementDetails: props.details,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onApproveHandler = (id, variant) => {
    setLoading(true);

    axios
      .patch("statements/pending/approval/" + id, approveDisapprove, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setLoading(false);
        enqueueSnackbar(result.data.message, { variant });
        props.onReloading();
      })
      .catch((err) => {
        enqueueSnackbar(err.message);
        setLoading(false);
      });
  };

  const onRejectHandler = (id, variant) => {
    setLoading(true);
    axios
      .patch("statements/pending/rejection/" + id, approveDisapprove, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setLoading(false);
        enqueueSnackbar("SuccessFully rejected", { variant });
        props.onReloading();
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong please try agin later");
        setLoading(false);
      });
  };
  const onDeleteHandler = (id, variant) => {
    setLoading(true);
    axios
      .patch(`statements/pending/delete/${id}`, approveDisapprove, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setLoading(false);
        enqueueSnackbar("SuccessFully deleted", { variant });
        props.onReloading();
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong please try agin later");
        setLoading(false);
      });
  };
  const onApproveWithAttention = (id, variant) => {
    setLoading(true);
    axios
      .patch("statements/pending/attention/" + id, approveDisapprove, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setLoading(false);
        enqueueSnackbar("SuccessFully Approved with Attention", { variant });
        props.onReloading();
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong please try agin later");
        setLoading(false);
      });
  };

  let buffer = null;
  if (loading) {
    buffer = <Spinner />;
  }
  if (!loading) {
    buffer = (
      <Grid container spacing={1}>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <h2>
                <strong>Title:</strong>
                {props.newItem.title}
              </h2>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <div style={{ width: "100%", boxSizing: "border-box" }}>
                <p style={{ boxSizing: "border-box" }}>
                  <strong>
                    To view full statement click on eye button on your right
                    side
                  </strong>
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12} md={12} lg={12}>
              <RejectConfirmation
                toolTipTitle="Approve"
                tooltipPlacement="left-start"
                body="By clicking on confirm button you are making this statement visible for students."
                variant="contained"
                color="primary"
                icon={<i className="fas fa-check"></i>}
                ActionOption={() =>
                  onApproveHandler(props.newItem._id, "success")
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <RejectConfirmation
                toolTipTitle="Approve & Attention"
                tooltipPlacement="left-start"
                body="By clicking on confirm button you are making this statement as highly important and need for an attention."
                variant="contained"
                color="primary"
                icon={
                  <i
                    style={{ color: "#eaf453" }}
                    className="fas fa-check-double"
                  ></i>
                }
                ActionOption={() =>
                  onApproveWithAttention(props.newItem._id, "success")
                }
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <RejectConfirmation
                toolTipTitle="Reject"
                tooltipPlacement="left-start"
                body="By clicking on confirm button you are making this statement as it is
                not-appropriate or it is not useful for students."
                variant="contained"
                color="secondary"
                icon={<i className="fas fa-times"></i>}
                ActionOption={() =>
                  onRejectHandler(props.newItem._id, "success")
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <RejectConfirmation
                toolTipTitle="Delete"
                tooltipPlacement="left-start"
                body="By clicking on confirm button you are removing this statement from database of problemspotter.com"
                variant="contained"
                color="secondary"
                icon={<i className="fas fa-trash"></i>}
                ActionOption={() =>
                  onDeleteHandler(props.newItem._id, "success")
                }
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Tooltip title="Watch" placement="left-start">
                <Button>
                  <Link
                    href={`/statement/id/${props.newItem.title
                      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                      .replace(/ /g, "-")}/${props.newItem._id}`}
                  >
                    <a>
                      {" "}
                      <i class="fas fa-eye"></i>
                    </a>
                  </Link>
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (!canApprove) {
    buffer = router.push("/statements");
  }
  return (
    <div style={{ width: "100%" }}>
      <MetaTags>
        <title>{"Problemspotter - Approved statements"}</title>
        <meta
          id="meta-description"
          name="description"
          content={"Statement Approval by experts"}
        />
        <meta
          id="og-title"
          property="og:title"
          content={
            "Construction site problems , Educational website for civil engineering students , Learn the current scenario of construction site,What kind of problems they are facing"
          }
        />
        <meta
          id="og-image"
          property="og:image"
          content={
            `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
      </MetaTags>
      {buffer}
      <hr />
    </div>
  );
};
export default ListItemPrivate;
