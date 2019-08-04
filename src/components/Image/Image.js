import React from "react";
import "./image.css";
class Image extends React.Component {

  render() {
    return (
      <img
        src={this.props.src}
        alt=""
        onClick={this.props.onClickImage}
        style={{ height: this.props.height + "px", width: "200px" }}
        data-index={this.props.dataIndex}
      />
    );
  }
}

export default Image;
