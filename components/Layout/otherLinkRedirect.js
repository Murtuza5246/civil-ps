import React, { Component } from "react";
import { Redirect } from "react-router";

class otherLinkRedirect extends Component {
  render() {
    return (
      <div>
        <Redirect to={"/user/details/" + this.props.match.params.id} />
      </div>
    );
  }
}

export default otherLinkRedirect;
