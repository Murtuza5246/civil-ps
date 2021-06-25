import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./help.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "../axios/axios";
import MetaTags from "react-meta-tags";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Help extends Component {
  state = {
    email: "",
    name: "",
    query: "",
    clicked: true,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (
      this.state.email !== "" &&
      this.state.name !== "" &&
      this.state.query !== "" &&
      this.state.query.length > 10
    )
      this.setState({ clicked: false });
  }
  submitHandler(e) {
    e.preventDefault();

    axios.post("/help");
  }
  render() {
    return (
      <div className={classes.helpMainDiv}>
        <MetaTags>
          <title>Problemspotter - Help section</title>
          <meta
            id="meta-description"
            name="description"
            content="We make sure your query get solved in a time."
          />
          <meta
            id="og-title"
            property="og:title"
            content="User query in support"
          />
          {/* <meta
              id="og-image"
              property="og:image"
              content={
                "https://my-server-problemspotter.herokuapp.com/image/image/" +
                this.state.statement.statementImage
              }
            /> */}
        </MetaTags>
        <h1>Help</h1>
        <form>
          <TextField
            required
            id="outlined-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Email address"
            helperText="Registered email"
            fullWidth
            name="email"
            onChange={(e) => this.onChangeHandler(e)}
            value={this.state.email}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            required
            id="outlined-full-width"
            label="Name"
            onChange={(e) => this.onChangeHandler(e)}
            name="name"
            value={this.state.name}
            style={{ margin: 8 }}
            placeholder="Full name"
            helperText="Registered name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            required
            id="outlined-full-width"
            label="query"
            onChange={(e) => this.onChangeHandler(e)}
            name="query"
            value={this.state.query}
            style={{ margin: 8 }}
            placeholder="query"
            helperText="Please write in details so we can take action "
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button
            onClick={(e) => this.submitHandler(e)}
            type="submit"
            variant="contained"
            color="primary"
            // disabled={this.state.clicked}
            disabled
          >
            {/* Submit */}
            Coming soon
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Help);
