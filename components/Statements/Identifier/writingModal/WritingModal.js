import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import classes1 from "./writingModal.module.css";
import TextEditor from "../../../qAndA/TextEditor/TextEditor";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import ImageCarasol from "./imageCarasol";
import Link from "next/link";
import axios from "../../../axios/axios";
import { CircularProgress, useMediaQuery } from "@material-ui/core";
import Progress from "reactstrap/lib/Progress";
import { useSnackbar } from "notistack";
import PrivacyChoice from "./privacyChoice/PrivacyChoice";
import YoutubeVideo from "../../../videoPlayer/Youtube";

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

export default function WritingModal(props) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [gettingData, setGettingData] = useState(false);
  const [images, setImages] = useState("");
  const [selectedImagePre, setSelectedImagePre] = useState([]);
  const [uploadPercent, setUploadPercent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlyMe, setOnlyMe] = useState(false);
  const [youTubeLink, setYouTubeLink] = useState("");

  const gettingDataClicker = () => {
    setGettingData(!gettingData);
  };

  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const userId = useSelector((state) => state.user.userId);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const authType = useSelector((state) => state.user.authType);
  const composeHandler = useSelector((state) => state.user.composeHandler);
  const level = useSelector((state) => state.user.level);
  const matches = useMediaQuery("(max-width:500px)");
  const onFilesHandler = (e) => {
    setImages(e.target.files);
    let imageArray = [];
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        imageArray.push({ image: URL.createObjectURL(e.target.files[i]) });
      }
      setSelectedImagePre(imageArray);
    } catch {
      setSelectedImagePre([]);
    }

    return;
  };

  const submitQuestionHandler = (data, mentions) => {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setUploadPercent(percent);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    };
    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();

    let formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("postImages", images[i]);
    }
    formData.append("email", email);
    formData.append("name", fName + " " + lName);
    formData.append("postContent", JSON.stringify(data));
    formData.append("userId", userId);
    formData.append("authType", authType);
    formData.append("mentions", JSON.stringify(mentions));
    formData.append("date", date);
    formData.append("time", time);
    formData.append("onlyMe", onlyMe);
    formData.append("youTubeLink", youTubeLink);

    if (data.blocks[0].text === "") {
      return enqueueSnackbar("please first write something");
    }
    setLoading(true);
    axios
      .post("/identifierPost/post", formData, options)
      .then((result) => {
        setLoading(false);
        setSelectedImagePre([]);
        setUploadPercent(100);
        enqueueSnackbar("Uploaded", { variant: "success" });
        props.fetchData();
        setTimeout(() => {
          setUploadPercent(0);
        }, 1000);
        setTimeout(() => {
          handleClose();
        }, 1100);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const setPrivacy = (bool) => {
    setOnlyMe(bool);
  };

  return (
    <div>
      {(level >= 25000 || composeHandler) && (
        <div className={classes1.writingBoxDiv} onClick={handleClickOpen}>
          <p>Share quick note.{fName ? " " + fName + " " + lName : null}</p>
        </div>
      )}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={matches}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create post
        </DialogTitle>
        <DialogContent dividers>
          {fName && (
            <span className={classes1.writingModalName}>
              {"@" + fName + " " + lName}
            </span>
          )}
          <TextEditor
            submitQuestionHandler={(data, mentionsData) =>
              submitQuestionHandler(data, mentionsData)
            }
            gettingData={gettingData}
          >
            <Typography>
              Write your thoughts below.
              <span style={{ color: "grey", fontSize: "15px" }}>
                You can mention someone by just adding "@".
              </span>
              <hr />
            </Typography>
          </TextEditor>
          {selectedImagePre.length !== 0 && (
            <ImageCarasol images={selectedImagePre} />
          )}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              YouTube Link{" "}
              <span style={{ color: "red" }} className="fab fa-youtube"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="youTubeURL"
              value={youTubeLink}
              onChange={(e) => setYouTubeLink(e.target.value)}
              placeholder="Enter YouTube link here"
            />
            <Form.Text className="text-muted">
              Sharing videos are good practice to share knowledge.
            </Form.Text>
          </Form.Group>
          {youTubeLink !== "" && (
            <div>
              <YoutubeVideo videoId={youTubeLink} />
            </div>
          )}
          <Form.File
            // className={classes.uploadFilesPadding}
            accept="image/*"
            multiple="multiple"
            id="custom-file"
            label={
              images === ""
                ? "Choose image "
                : images.length +
                  " image" +
                  (images.length > 1 ? "s" : "") +
                  " selected"
            }
            onChange={(e) => onFilesHandler(e)}
            custom
          />
          <div style={{ height: "10px" }}></div>
          <PrivacyChoice setPrivacy={setPrivacy} />

          <Progress
            max="100"
            color="success"
            value={uploadPercent}
            className="mt-4 mb-1"
          >
            {isNaN(Math.round(uploadPercent, 2))
              ? 0
              : Math.round(uploadPercent, 2)}
            %
          </Progress>
          {userId ? (
            loading ? (
              <Button>
                <CircularProgress size={20} />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={gettingDataClicker}
                color="primary"
                disabled={!userId}
              >
                Post
              </Button>
            )
          ) : (
            <Button color={"primary"} variant="outlined">
              <Link href="/login">
                <a style={{ color: "red", textDecoration: "none" }}>
                  {" "}
                  {"    "}LogIn{"    "}
                </a>
              </Link>
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
