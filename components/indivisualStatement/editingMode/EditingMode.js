import { Button } from "@material-ui/core";
import React from "react";
import { Form } from "react-bootstrap";
import dynamic from "next/dynamic";
const TextEditorIn = dynamic(
  async () => {
    return import("../TextEditorIn");
  },
  { ssr: false }
);
const EditingMode = (props) => {
  const textEditorErrorHandle = () => {
    try {
      return <TextEditorIn />;
    } catch {
      return (
        <div>
          <p>the problem with textEditor is occurred;;</p>
        </div>
      );
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <Form
        action="submit"
        encType="multipart/form-data"
        // onSubmit={(e) => this.onSubmitHandler(e, "success")}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="updatedTitle"
            value={props.updatedTitle}
            onChange={(e) => props.onChangeHandler(e)}
            placeholder="title"
          />
        </Form.Group>

        <Form.Label>Detailed Statement</Form.Label>
        {textEditorErrorHandle()}

        <Button
          variant="contained"
          color="primary"
          onClick={props.updateStatement}
        >
          Submit
        </Button>
      </Form>
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginTop: "20px" }}
        onClick={props.cancleEditingButton}
      >
        cancel
      </Button>
    </div>
  );
};

export default EditingMode;
