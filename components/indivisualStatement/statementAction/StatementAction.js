import React, { useState } from "react";
import axios from "../../axios/axios";
import RejectConfirmation from "../../ListItem-Approval/RectConfirmation";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import Spinner from "../../UI/Spinner/Spinner";
import { useSelector } from "react-redux";
import classes from "./statementAction.module.css";

const StatementAction = (props) => {
  const [loading, setLoading] = useState(false);
  const email = useSelector((state) => state.user.email);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const userId = useSelector((state) => state.user.userId);

  const canApprove = useSelector((state) => state.user.canApprove);
  const token = useSelector((state) => state.user.token);
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
  let data;

  if (!loading) {
    data = (
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} ls={6} xl={6}>
          <RejectConfirmation
            toolTipTitle="Approve"
            tooltipPlacement="left-start"
            body="By clicking on confirm button you are making this statement visible for students."
            variant="contained"
            color="primary"
            icon={<i className="fas fa-check"></i>}
            ActionOption={() => onApproveHandler(props._id, "success")}
          />
        </Grid>
        <Grid item xs={6} md={6} ls={6} xl={6}>
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
            ActionOption={() => onApproveWithAttention(props._id, "success")}
          />
        </Grid>

        <Grid item xs={6} md={6} ls={6} xl={6}>
          <RejectConfirmation
            toolTipTitle="Reject"
            tooltipPlacement="left-start"
            body="By clicking on confirm button you are making this statement as it is
                not-appropriate or it is not useful for students."
            variant="contained"
            color="secondary"
            icon={<i className="fas fa-times"></i>}
            ActionOption={() => onRejectHandler(props._id, "success")}
          />
        </Grid>
        <Grid item xs={6} md={6} ls={6} xl={6}>
          <RejectConfirmation
            toolTipTitle="Delete"
            tooltipPlacement="left-start"
            body="By clicking on confirm button you are removing this statement from database of problemspotter.com"
            variant="contained"
            color="secondary"
            icon={<i className="fas fa-trash"></i>}
            ActionOption={() => onDeleteHandler(props._id, "success")}
          />
        </Grid>
      </Grid>
    );
  } else {
    data = <Spinner />;
  }
  return (
    <div className={classes.actionMainDiv}>
      <hr />
      <p>The statement action button</p>
      <hr />
      <div className={classes.mainActionDiv}>{data}</div>
    </div>
  );
};
export default StatementAction;
