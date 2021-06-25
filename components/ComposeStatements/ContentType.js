import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const ContentType = (props) => {
  const authType = useSelector((state) => state.user.authType);
  useEffect(() => {
    if (authType === "Admin") return props.onChangeHandler("Knowledge");
    if (authType === "Professor") return props.onChangeHandler("Knowledge");
    if (authType === "Identifier") return props.onChangeHandler("Problem");
  }, [authType]);
  const onChangeHandler = (e) => {
    return props.onChangeHandler(e.target.value);
  };

  return (
    <Form.Control
      as="select"
      name="label"
      required
      value={props.label}
      onChange={(e) => onChangeHandler(e)}
    >
      <option>Problem</option>
      <option>Knowledge</option>
    </Form.Control>
  );
};

export default ContentType;
