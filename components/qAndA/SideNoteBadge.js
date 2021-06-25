import React, { Component } from "react";
import { Badge } from "reactstrap";

class SideNoteBadge extends Component {
  render() {
    return (
      <Badge color="secondary" className={this.props.className}>
        {this.props.title}
        {"  "}
        {this.props.component ? this.props.component : null}
      </Badge>
    );
  }
}

export default SideNoteBadge;
