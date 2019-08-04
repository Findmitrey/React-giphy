import React from "react";

import "./ModalCss/ModalWindow.css";
class ModalWindow extends React.Component {
  render() {
    return (
      <aside className="modal" id="modal">
        {this.props.children}
      </aside>
    );
  }
}

export default ModalWindow;
