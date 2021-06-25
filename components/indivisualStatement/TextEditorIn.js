import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";
import * as actionCreator from "../../redux/actions/index";
import axios from "../axios/axios";
import editorStyles from "../textEditor/editorStyles.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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

class ConvertFromRawDraftContent extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(this.props.textObject);
    const contentState1 = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
      contentState: contentState1,
      mentions: [],
    };
  }
  componentDidMount() {
    this.onFetchingAllTheUsers();
  }
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

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.textEditor(editorState);
    this.props.finalTextEditor(editorState);
  };
  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
    this.props.finalTextEditor(contentState);
  };

  render() {
    const errorControlElement = () => {
      try {
        return (
          <div>
            <span>
              Note: <p>{"You can start editing from below"}</p>
            </span>
            <div className={editorStyles.editor}>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onContentStateChange}
                mention={{
                  separator: " ",
                  trigger: "@",
                  suggestions: this.state.mentions,
                }}
              />
            </div>
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

    const { editorState } = this.state;
    return errorControlElement();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    textEditor: (textObject) => dispatch(actionCreator.textEditor(textObject)),

    mentionUserFound: (data) => dispatch(actionCreator.userMentionFound(data)),
    finalTextEditor: (newObject) =>
      dispatch(actionCreator.newUpdatedStatement(newObject)),
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
)(ConvertFromRawDraftContent);
