import React, { Component } from "react";
import Identifier from "../Identifier/Identifier";

export default class PostsScroll extends Component {
  constructor(props) {
    super(props);
    this.iScroll = React.createRef();
    this.state = {
      searchTerm: "cyanotype",
      photoList: [],
      numberOfPosts: 8,
      loadingState: false,
      loadingMessage: "",
      hasMore: true,
    };
  }

  componentDidMount() {
    this.onInfiniteScroll();
  }

  /* code for infinite scroll */
  onInfiniteScroll = () => {
    iScroll.addEventListener("scroll", () => {
      if (
        iScroll.scrollTop + iScroll.clientHeight >=
        iScroll.scrollHeight - 20
      ) {
        this.loadMoreItems();
      }
    });
  };

  /* code for infinite scroll */
  loadMoreItems = () => {
    if (this.state.loadingState || this.props.posts > this.state.hasMore) {
      console.log("not returning");
      return;
    }
    console.log("returning");
    this.setState({
      loadingState: true,
      loadingMessage: "Loading posts...",
    });
    setTimeout(() => {
      this.setState((prevState) => ({
        items: prevState.numberOfPosts + 8,
        loadingState: false,
        loadingMessage: "No more post to show.",
      }));
    }, 1000);
  };

  render() {
    return (
      <div className="appContainer" ref={this.iScroll}>
        <div className="gridContainer">
          {this.props.posts
            .slice(0, this.state.numberOfPosts)
            .map((item, index) => (
              <Identifier
                item={item}
                fetchData={this.props.fetchData}
                paramsId={this.props.paramsId}
                paramsFetch={this.props.paramsFetch}
              />
            ))}
        </div>

        <React.Fragment>
          {this.state.loadingState ? (
            <p className="loading">{this.state.loadingMessage}</p>
          ) : (
            <p className="loading">{this.state.loadingMessage}</p>
          )}
        </React.Fragment>
      </div>
    );
  }
}
