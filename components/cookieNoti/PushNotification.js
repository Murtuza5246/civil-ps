import React from "react";
import ReactNotifications from "react-browser-notifications";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.n.supported()) this.n.show();
  }

  handleClick(event) {
    // Do something here such as

    window.focus();
    window.open(this.props.link, "_self");

    // Lastly, Close the notification
    this.n.close(event.target.tag);
    this.props.resetThis();
  }

  render() {
    return (
      <div>
        <ReactNotifications
          onRef={(ref) => (this.n = ref)} // Required
          // title={"this is title"} // Required
          title={this.props.title} // Required
          body={"Follow this link to see what happened"}
          icon="https://problemspotter.com/LOGO.png"
          tag="abcdef"
          timeout="6000"
          onClick={(event) => this.handleClick(event)}
        />
      </div>
    );
  }
}
