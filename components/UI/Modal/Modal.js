import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../BackDrop/Backdrop.js";
class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-150vh)",
            opacity: this.props.show ? "1" : "0",
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
