import React, { Component } from "react";

class ImageResolver extends Component {
  state = {};
  render() {
    return (
      <img
        src={this.props.image}
        width="30"
        height="20"
        mode="fit"
        alt="cloud provider logo"
      />
    );
  }
}

export default ImageResolver;
