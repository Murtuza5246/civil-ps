import classes from "./shareIcons.module.css";
import { useSnackbar } from "notistack";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { IconButton, Tooltip, useMediaQuery } from "@material-ui/core";

const ShareIcons = (props) => {
  const width = useMediaQuery("(min-width:500px)");
  const { enqueueSnackbar } = useSnackbar();
  const onClickToCopy = (id) => {
    navigator.clipboard.writeText(id);
    enqueueSnackbar("Url Copied", { variant: "success" });
  };
  return (
    <div className={classes.shareIconsMainDiv}>
      <Tooltip title="Email">
        <EmailShareButton url={props.url}>
          <EmailIcon round={true} size={width ? 32 : 20} />
        </EmailShareButton>
      </Tooltip>
      <Tooltip title="Whatsapp">
        <WhatsappShareButton url={props.url}>
          <WhatsappIcon round={true} size={width ? 32 : 20} />
        </WhatsappShareButton>
      </Tooltip>
      <Tooltip title="copy link">
        <IconButton
          onClick={() => onClickToCopy(props.url)}
          color="primary"
          size="small"
          style={{
            backgroundColor: "#c6fced",
            padding: width ? "7px" : "3px",
            marginTop: width ? "auto" : "5px",
          }}
        >
          <FileCopyIcon fontSize={width ? "default" : "small"} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Facebook">
        <FacebookShareButton url={props.url}>
          <FacebookIcon round={true} size={width ? 32 : 20} />
        </FacebookShareButton>
      </Tooltip>
      <Tooltip title="Linkedin">
        <LinkedinShareButton url={props.url}>
          <LinkedinIcon round={true} size={width ? 32 : 20} />
        </LinkedinShareButton>
      </Tooltip>
      <Tooltip title="Pinterest">
        <PinterestShareButton url={props.url}>
          <PinterestIcon round={true} size={width ? 32 : 20} />
        </PinterestShareButton>
      </Tooltip>{" "}
      <Tooltip title="Telegram">
        <TelegramShareButton url={props.url}>
          <TelegramIcon round={true} size={width ? 32 : 20} />
        </TelegramShareButton>
      </Tooltip>{" "}
      <Tooltip title="Twitter">
        <TwitterShareButton url={props.url}>
          <TwitterIcon round={true} size={width ? 32 : 20} />
        </TwitterShareButton>
      </Tooltip>
      <Tooltip title="Mailru">
        <MailruShareButton url={props.url}>
          <MailruIcon round={true} size={width ? 32 : 20} />
        </MailruShareButton>
      </Tooltip>
      <Tooltip title="Pocket">
        <PocketShareButton url={props.url}>
          <PocketIcon round={true} size={width ? 32 : 20} />
        </PocketShareButton>
      </Tooltip>{" "}
      <Tooltip title="Reddit">
        <RedditShareButton url={props.url}>
          <RedditIcon round={true} size={width ? 32 : 20} />
        </RedditShareButton>
      </Tooltip>{" "}
      <Tooltip title="Tumblr">
        <TumblrShareButton url={props.url}>
          <TumblrIcon round={true} size={width ? 32 : 20} />
        </TumblrShareButton>
      </Tooltip>
      <Tooltip title="Live Journal">
        <LivejournalShareButton url={props.url}>
          <LivejournalIcon round={true} size={width ? 32 : 20} />
        </LivejournalShareButton>
      </Tooltip>
    </div>
  );
};

export default ShareIcons;
