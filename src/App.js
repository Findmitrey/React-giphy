import React from 'react';
import ReactDOM from 'react-dom'
import Search from './components/Search/Search'
import Gif from './components/Gif/Gif'
import Modal from './components/Modal/Modal';
// import ModalWindow from "./components/ModalWindow/ModalWindow"

class App extends React.Component {
    constructor(props){
      super(props);
      this.searchClick = this.searchClick.bind(this);
      this.state = {
        url: 'api.giphy.com/v1/gifs/trending',
        api_key: 'cyzkcIRHhtGX0IFJ5f1u8cZArMiYoSyR',
        limit: 1,
        search: '',
        imageData: {},
        modalOpen : false
      }
    }

    searchClick(value){
      const url = value ? 'api.giphy.com/v1/gifs/search' : 'api.giphy.com/v1/gifs/trending'
      this.setState( prevState =>{
        if(prevState.search !== value)
          return {
            url,
            search: value
          }
      });
    }

    clickImage(imageData){
      this.setState(prevState => ({imageData, modalOpen: !prevState.modalOpen}))
    }

    modalClose(){
      this.setState(prevState => ({modalOpen: !prevState.modalOpen}))
    }

    render() {
      
      if(this.state.search)
        this.info = `Results: #${this.state.search}`
      else this.info = 'Trending Gifs'

      if(this.state.modalOpen)
        document.body.classList.add('no-scroll');
      else document.body.classList.remove('no-scroll');

      return (
        <div className="container">
          <Search onChange={this.searchClick}/>
          <h3 className="infoSearch">{this.info}</h3>
          <Gif url={this.state.url} 
               api_key={this.state.api_key} 
               limit={this.state.limit} 
               search={this.state.search}
               onClickImg={this.clickImage.bind(this)}
          />
          {this.state.modalOpen &&
            ReactDOM.createPortal(
              <Modal data={this.state.imageData} modalClose={this.modalClose.bind(this)} />,
              document.getElementById('modal-window')
            )
          }
        </div>
      )
    }
}

export default App;
