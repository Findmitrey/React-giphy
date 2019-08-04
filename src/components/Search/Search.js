import React from "react";

import "./Search.css";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const inputValue = e.target.value;
    clearTimeout(this.timerId);
    
    this.timerId = setTimeout(()=>{
      this.props.onChange(inputValue);
    }, 400);
    
  }
  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search Gifs..."
          onInput={this.handleChange}
          required
        />
        {/* <button
          className="search__btn"
          onClick={this.handleChange}
          type="button"
        >
          OK
        </button> */}
      </div>
    );
  }
}

export default Search;
