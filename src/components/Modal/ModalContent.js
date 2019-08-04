import React from "react";
import "./ModalCss/ModalContent.css";

class ModalContent extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <section className="modal__text">
        <div className="modal__picture">
          <img src={data.images.fixed_width.webp} alt="" />
        </div>
        <div className="modal__info">
          <p>
            Source URL:{" "}
            <a href={data.images.fixed_width.webp}>
              {data.images.fixed_width.webp}
            </a>
          </p>
          <p>Content rating :{data.rating}</p>
          <p>Import date: {data.import_datetime}</p>
        </div>
      </section>
    );
  }
}

export default ModalContent;
