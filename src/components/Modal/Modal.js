import React from "react";

import ModalWindow from "./ModalWindow";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";

import "./ModalCss/Modal.css";
class Modal extends React.Component {
  render() {
    return (
      <div className="modalOverlay">
        <ModalWindow>
          <ModalHeader modalClose={this.props.modalClose} />
          <ModalContent data={this.props.data} />
        </ModalWindow>
      </div>
    );
  }
}

export default Modal;
