import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  getDefaultKeyBinding,
  RichUtils,
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import addLinkPlugin from "./LinkPlugin";
import "draft-js-hashtag-plugin/lib/plugin.css";
import editorStyles from "./editorStyles.module.css";
import createHashtagPlugin from "draft-js-hashtag-plugin";
import "draft-js-mention-plugin/lib/plugin.css";
import axios from "../../axios/axios";
import { Typography, useMediaQuery } from "@material-ui/core";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import classes from "./editorStyles.module.css";

import MentionComponent from "./mentionComponent";
import * as actionCreator from "../../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

let mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionComponent: MentionComponent,
});
let { MentionSuggestions } = mentionPlugin;
const cmdState = {
  handled: "handled",
  notHandled: "not-handled",
};
const TextInput = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestion] = useState([]);
  const width = useMediaQuery("(min-width:500px)");
  const dispatch = useDispatch();
  const mentions = useSelector((state) => state.user.mentions);

  useEffect(() => {
    if (props.gettingData)
      props.submitQuestionHandler(
        convertToRaw(addLinkPlugin(editorState).getCurrentContent()),
        onExtractMentions()
      );
  }, [props.gettingData]);

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  useEffect(() => {
    onFetchingAllTheUsers();
  }, []);

  const onFetchingAllTheUsers = () => {
    if (mentions.length === 0)
      axios
        .get("user/all")
        .then((result) => {
          dispatch(actionCreator.userMentionFound(result.data.members));
          setSuggestion(result.data.members);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const onSearchChange = ({ value }) => {
    setSuggestion(defaultSuggestionsFilter(value, mentions));
  };

  const onExtractMentions = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      const ent = raw.entityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention.email);
      }
    }

    return mentionedUsers;
  };
  const keyBindingFn = (e) => {
    // retrun custom commands on keyPress if required
    return getDefaultKeyBinding(e);
  };
  const handleKeyCommand = (command) => {
    // handle custom command here;

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return cmdState.handled;
    }
    return cmdState.notHandled;
  };
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  const linkifyPlugin = createLinkifyPlugin();
  const hashtagPlugin = createHashtagPlugin();
  const plugins = [mentionPlugin, hashtagPlugin, addLinkPlugin];
  if (getDeviceType() === "desktop") {
    plugins.push(linkifyPlugin);
  }

  const errorElement = () => {
    try {
      return (
        <div className={editorStyles.editor}>
          {props.children}
          <div className={classes.editorScrollDiv}>
            <Editor
              editorState={editorState}
              onChange={onChange}
              plugins={plugins}
              keyBindingFn={keyBindingFn}
              handleKeyCommand={handleKeyCommand}
            />
          </div>
          <MentionSuggestions
            onSearchChange={onSearchChange}
            suggestions={suggestions}
          />
        </div>
      );
    } catch {
      return (
        <div style={{ width: "100%", textAlign: "center" }}>
          <p>
            You have encountered an error!! reload the page to submit your
            thoughts
          </p>
        </div>
      );
    }
  };

  return <div style={{ width: "100%" }}>{errorElement()}</div>;
};

export default TextInput;
