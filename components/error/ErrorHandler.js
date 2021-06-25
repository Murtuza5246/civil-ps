import React from "react";
import classes from "./error.module.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error: error, info: info });
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={classes.errorDiv}>
          <h1>
            You have encountered an error!! you might need to restart the page.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
