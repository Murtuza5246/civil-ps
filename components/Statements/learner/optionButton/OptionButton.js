import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";
import classes from "./optionMenu.module.css";
import axios from "../../../axios/axios";
import { CircularProgress, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PublicIcon from "@material-ui/icons/Public";
import { useSnackbar } from "notistack";
import ShareModal from "../ShareModal";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(false);
  const [openShareModal, setOpenShareModal] = React.useState(false);

  const [privacyButtonLoading, setPrivacyButtonLoading] = React.useState(false);
  const userId = useSelector((state) => state.user.userId);
  const authType = useSelector((state) => state.user.authType);
  const token = useSelector((state) => state.user.token);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteButtonClick = (id) => {
    setDeleteButtonLoading(true);
    axios
      .patch(
        `/learnerPost/delete/${id}/${userId}`,
        { authType: authType },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        setDeleteButtonLoading(false);
        enqueueSnackbar(result.data.message, { variant: "success" });
        props.fetchData();
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar(err.message);
        setDeleteButtonLoading(false);
        console.log(err);
      });
  };
  const privacyButtonClick = (id) => {
    setPrivacyButtonLoading(true);
    axios
      .patch(
        `/learnerPost/privacy/${id}/${userId}`,
        { authType: authType },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        setPrivacyButtonLoading(false);
        enqueueSnackbar(result.data.message, { variant: "success" });
        props.fetchData();
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar(err.message);
        setPrivacyButtonLoading(false);
        console.log(err);
      });
  };

  const openShareModalClick = () => {
    setOpenShareModal(true);
    handleClose();
  };
  const onCloseShareDialog = () => {
    setOpenShareModal(false);
  };
  return (
    <div>
      <ShareModal
        url={`https://civil.problemspotter.com/statements?learnerPost=${props.postId}`}
        open={openShareModal}
        onCloseShareDialog={onCloseShareDialog}
      />
      <IconButton onClick={handleClick} autoFocus={false}>
        <MoreHorizIcon />
      </IconButton>
      {/* </div> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => openShareModalClick()}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="share" />
        </StyledMenuItem>
        {(props.postUploaderId === userId || authType === "Admin") && (
          <StyledMenuItem onClick={() => deleteButtonClick(props.postId)}>
            <ListItemIcon>
              {deleteButtonLoading ? (
                <CircularProgress size={15} color="secondary" />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary="delete" />
          </StyledMenuItem>
        )}
        {(props.postUploaderId === userId || authType === "Admin") &&
          (props.onlyMe ? (
            <StyledMenuItem onClick={() => privacyButtonClick(props.postId)}>
              <ListItemIcon>
                {privacyButtonLoading ? (
                  <CircularProgress size={15} color="secondary" />
                ) : (
                  <PublicIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText primary="Public" />
            </StyledMenuItem>
          ) : (
            <StyledMenuItem onClick={() => privacyButtonClick(props.postId)}>
              <ListItemIcon>
                {privacyButtonLoading ? (
                  <CircularProgress size={15} color="secondary" />
                ) : (
                  <LockIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText primary="only me" />
            </StyledMenuItem>
          ))}
      </StyledMenu>
    </div>
  );
}
