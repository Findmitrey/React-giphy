import React from "react";
import './ModalCss/ModalHeader.css'
class ModalHeader extends React.Component {


  render() {
    return (
      <header className="modal__title">
        <h2>Details</h2>
        <label className="modal_close" for="modal" onClick={this.props.modalClose}>
          &#10005;
        </label>
        <hr/>
      </header>
    );
  }
}

export default ModalHeader;
