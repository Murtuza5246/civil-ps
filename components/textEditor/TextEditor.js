import React, { Component } from "react";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import editorStyles from "./editorStyles.module.css";
import * as actionCreator from "../../redux/actions/index";
import axios from "../axios/axios";

const content = {
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
};
const HANDLED = "handled";

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
      mentions: [],
    };
  }
  componentDidMount() {
    this.onFetchingAllTheUsers();
  }
  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
    this.props.textEditor(contentState);
    this.props.object(contentState);

    this.props.mentionedPeople(this.onExtractMentions());
  };

  onExtractMentions = () => {
    const raw = this.state.contentState;
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      const ent = raw.entityMap[key];
      if (ent.type === "MENTION") {
        let newEmailArray = this.state.mentions.filter(
          (item) => item.url === ent.data.url
        );
        mentionedUsers.push(newEmailArray[0].email);
      }
    }
    return mentionedUsers;
  };
  onFetchingAllTheUsers() {
    if (this.props.mentions.length === 0) {
      axios
        .get("user/all")
        .then((result) => {
          this.props.mentionUserFound(result.data.members);
          this.setState({ mentions: result.data.members });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ mentions: this.props.mentions });
    }
  }
  render() {
    const errorHandlingFunc = () => {
      try {
        return (
          <div className={editorStyles.editor}>
            <Editor
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              handleBeforeInput={this.handleBeforeInput}
              onContentStateChange={this.onContentStateChange}
              mention={{
                separator: " ",
                trigger: "@",
                suggestions: this.state.mentions,
              }}
            />
          </div>
        );
      } catch {
        return (
          <div style={{ width: "100%", border: "2px solid red" }}>
            <p>You have encountered an error!! reload page to continue</p>
          </div>
        );
      }
    };
    return errorHandlingFunc();
  }
}
function mapDispatchToProps(dispatch) {
  return {
    textEditor: (textObject) => dispatch(actionCreator.textEditor(textObject)),
    mentionUserFound: (data) => dispatch(actionCreator.userMentionFound(data)),
  };
}
function mapStateToProps(state) {
  return {
    textObject: state.user.textObject,
    mentions: state.user.mentions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorConvertToJSON);
