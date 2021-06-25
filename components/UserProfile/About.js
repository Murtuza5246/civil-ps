import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextEditor from "../textEditor/TextEditor";
import { Button, Card, Tooltip } from "@material-ui/core";
import draftToHtml from "draftjs-to-html";
import { useSnackbar } from "notistack";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import { Markup } from "interweave";
import axios from "../axios/axios";
import classes from "./about.module.css";

const AboutInfo = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [object, setObject] = useState({
    entityMap: {},
    blocks: [
      {
        key: "637gr",
        text: "Initialized from content state.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  });
  const [collapse, setCollapse] = useState(false);
  const [mentions, setMentions] = useState(false);
  const userId = useSelector((state) => state.user.userId);

  const settingUpAboutObject = (objectFromEditor) => {
    setObject(objectFromEditor);
  };
  const submitInfoHandle = () => {
    if (object.blocks[0].text === "") {
      enqueueSnackbar("Please first write something");
      return;
    }
    if (object.blocks[0].text.length <= 5) {
      enqueueSnackbar("About can not be this much less");
      return;
    }
    let data = {
      data: JSON.stringify(object),
      mentions: JSON.stringify(mentions),
    };
    axios
      .patch(`user/about/update/${userId}`, data)
      .then((result) => {
        setCollapse(false);
        props.userDetailsFetching();
        enqueueSnackbar("Updated", { variant: "success" });
      })
      .catch((err) => {
        setCollapse(false);
        enqueueSnackbar("Went wrong");
      });
  };

  const mentionedPeople = (data) => {
    setMentions(data);
  };
  return (
    <div className={classes.mainAboutDiv}>
      <hr />
      <h4 className={classes.h4Tag}>About section</h4>
      <hr />
      <Card>
        <div className={classes.markupLookDiv}>
          {props.textObject ? (
            <Markup content={draftToHtml(JSON.parse(props.textObject))} />
          ) : (
            "yet to be written"
          )}
        </div>

        <hr />
        {userId === props.userId && (
          <div>
            {collapse && (
              <div>
                <TextEditor
                  object={settingUpAboutObject}
                  mentionedPeople={(data) => mentionedPeople(data)}
                />
              </div>
            )}
            <div className={classes.aboutButtons}>
              <Tooltip title="Collapse">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!userId || !collapse}
                  onClick={(e) => submitInfoHandle(e, "success")}
                >
                  {"    "}Submit{"    "}
                </Button>
              </Tooltip>
              <Button onClick={() => setCollapse(!collapse)}>
                <SwapVerticalCircleIcon
                  style={{ color: !collapse ? "#005086" : "grey" }}
                />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AboutInfo;
