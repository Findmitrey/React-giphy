import React from "react";
import Image from "../Image/Image";

import {
  CSSGrid,
  measureItems,
  makeResponsive,
  layout
} from "react-stonecutter";

import "./Gifs.css";

const Grid = makeResponsive(measureItems(CSSGrid), {
  maxWidth: 1200
});

class Gif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: "",
      offset: 0,
      search: ""
    };
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.getNextData();
          this.observer.unobserve(entry.target);
        }
      });
    });

    this.getData(this.createLink());
  }

  createLink(displayСoefficient = 1) {
    const widthWindow = window.innerWidth < 1200 ? window.innerWidth : 1200;
    const heightWindow = window.innerHeight;
    const widthImg = 200;
    const heightImg = 200;

    const limit = Math.floor(((widthWindow * heightWindow) / (widthImg * heightImg)) *displayСoefficient);

    return `http://${this.props.url}?api_key=${this.props.api_key}&limit=${limit}&q=${this.props.search}`;
  }

  getData(url, isClear = false) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const gifData = data.data;
        
        this.setState(prevState => {
          if (!isClear)
            return {
              data: prevState.data.concat(gifData),
              url: this.props.url,
              offset: prevState.offset + gifData.length
            };
          else
            return {
              data: gifData,
              url: this.props.url,
              offset: gifData.length,
              search: this.props.search
            };
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getNextData() {
    let url = `${this.createLink()}&offset=${this.state.offset}`;
    this.getData(url);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.search !== state.search)
      return {
        data: [],
        offset: 0
      };
    return null;
  }

  componentDidUpdate() {
    if (
      this.state.url !== this.props.url ||
      this.state.search !== this.props.search
    )
      this.getData(this.createLink(), true);
    else {
      setTimeout(() => {
        const domElem = document.querySelectorAll("span img");
        if (domElem.length) this.observer.observe(domElem[domElem.length - 1]);
      }, 10);
    }
  }
  clickImage(e) {
    const index = e.target.dataset.index;
    this.props.onClickImg(this.state.data[index]);
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="collection">
        <Grid
          component="div"
          columns={5}
          columnWidth={200}
          gutterWidth={10}
          gutterHeight={10}
          layout={layout.pinterest}
          duration={800}
          easing="ease-out"
        >
          {this.state.data.map((item, index) => (
            <span
              key={index}
              itemHeight={parseInt(item.images.fixed_width.height, 10)}
            >
              <Image
                key={item.id}
                src={item.images.fixed_width.webp}
                height={item.images.fixed_width.height}
                onClickImage={this.clickImage.bind(this)}
                dataIndex={index}
              />
            </span>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Gif;
