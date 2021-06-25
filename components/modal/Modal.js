import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import { fields } from "../Fields/Fields";
import FieldSelected from "../ComposeStatements/FieldSelect";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [state, setState] = React.useState([]);

  const selectedFields = (fields) => {
    setState(fields);
  };
  return (
    <div>
      <Dialog
        onClose={() => props.handleClose()}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullScreen
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => props.handleClose()}
        >
          Filter Your Search
        </DialogTitle>
        <DialogContent dividers>
          <FormGroup row>
            <div style={{ width: "100%" }}>
              <FieldSelected
                component={<p>Select your area of interest</p>}
                selectedFields={selectedFields}
                fieldArray={fields.map((name) => name.toUpperCase())}
              />
            </div>
            <div style={{ width: "100%", color: "grey", marginTop: "30px" }}>
              <Typography>
                <em>
                  To clear your area of interest just clear the above input and
                  click on save changes button below
                </em>
              </Typography>
            </div>
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => props.searchFieldsHandler(state)}
            color="primary"
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
