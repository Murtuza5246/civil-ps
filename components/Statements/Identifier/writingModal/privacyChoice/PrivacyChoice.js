import React, { Component, useState } from "react";
import { Form, Checkbox } from "semantic-ui-react";

const CheckboxExampleRadioGroup = (props) => {
  const [state, setState] = useState("everyone");
  const handleChange = (e, { value }) => {
    setState(value);
    props.setPrivacy(value === "only me");
  };

  return (
    <Form>
      <Form.Field>
        Privacy set to: <b>{state}</b>
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label="Everyone"
          name="checkboxRadioGroup"
          value="everyone"
          checked={state === "everyone"}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label="only me"
          name="checkboxRadioGroup"
          value="only me"
          checked={state === "only me"}
          onChange={handleChange}
        />
      </Form.Field>
    </Form>
  );
};

export default CheckboxExampleRadioGroup;
