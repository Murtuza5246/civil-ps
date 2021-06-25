import React from "react";
import classes from "./Input.module.css";
import { Form } from "react-bootstrap";

const Input = (props) => {
  let inputElement = null;
  let classElement = [];
  if (props.invalid && props.touched && props.shouldValidate)
    classElement.push(classes.Invalid);
  switch (props.elementType) {
    case "input":
      inputElement = (
        <Form.Group controlId="formBasicText">
          <Form.Label>
            <strong
              style={{
                textTransform: "capitalize",
              }}
            >
              Your {props.lable}
            </strong>
          </Form.Label>
          <Form.Control
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            autoFocus={props.lable === "name" ? true : false}
            className={classElement.join("")}
            required
          />
          {props.lable === "email" ? (
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          ) : null}
          {props.lable === "mobile" ? (
            <Form.Text className="text-muted">
              Our delivery partner contact you through this number.
            </Form.Text>
          ) : null}
        </Form.Group>
        // {/* <input
        //   className={classes.InputElement}
        //   {...props.elementConfig}
        //   value={props.value}
        //   onChange={props.changed}
        // /> */}
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          // className={classElement.join("")}
        />
      );
      break;
    case "select":
      inputElement = (
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>
            <strong
              style={{
                textTransform: "capitalize",
              }}
            >
              Choose {props.lable}
            </strong>
          </Form.Label>
          <Form.Control
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            className={classElement.join("")}
            as="select"
          >
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayvalue}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        // {/* <select
        //   className={classes.InputElement}
        //   {...props.elementConfig}
        //   value={props.value}
        //   onChange={props.changed}
        // >
        //   {props.elementConfig.options.map((option) => (
        //     <option key={option.value} value={option.value}>
        //       {option.displayvalue}
        //     </option>
        //   ))}
        // </select> */}
      );
      break;
    default:
      return null;
    // inputElement = (
    //   <input
    //     className={classes.InputElement}
    //     {...props.elementConfig}
    //     value={props.value}
    //   />
    // );
  }
  return (
    <div className={classes.Input}>
      {/* <lable className={classes.Lable}>{props.lable}</lable> */}
      {inputElement}
    </div>

    // <Form>
    //   <Form.Group controlId="formBasicText">
    //     <Form.Label>Your Name</Form.Label>
    //     <Form.Control
    //       type="text"
    //       value=""
    //       placeholder="Enter Your Name"
    //       onChange={props.changeHandler}
    //       autoFocus
    //     />
    //   </Form.Group>

    //   <Form.Group controlId="formBasicText">
    //     <Form.Label>Email</Form.Label>
    //     <Form.Control
    //       type="email"
    //       onChange={props.changeHandler}
    //       placeholder="Enter Your Email"
    //     />
    // <Form.Text className="text-muted">
    //   We'll never share your email with anyone else.
    // </Form.Text>
    //   </Form.Group>
    //   <Form.Group controlId="formBasicPassword">
    //     <Form.Label>Mobile</Form.Label>
    //     <Form.Control
    //       type="number"
    //       onChange={props.changeHandler}
    //       placeholder="Enter Your Number"
    //     />
    //     <Form.Text className="text-muted">
    //       Our delivery partner contact you through this number.
    //     </Form.Text>
    //   </Form.Group>

    //   <Form.Group controlId="formBasicPassword">
    //     <Form.Label>Street</Form.Label>
    //     <Form.Control
    //       type="text"
    //       onChange={props.changeHandler}
    //       placeholder="Your street Address"
    //     />
    //   </Form.Group>

    //   <Form.Group controlId="formBasicPassword">
    //     <Form.Label>Area Pin Code</Form.Label>
    //     <Form.Control
    //       type="number"
    //       onChange={props.changeHandler}
    //       placeholder="Pin Code"
    //     />
    //   </Form.Group>
    // </Form>
  );
};

export default Input;
