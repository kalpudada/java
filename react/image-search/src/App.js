import React from "react";
// Search Layout is used for search bar component
import SearchLayout from "./components/SearchLayout";
// Photo Layout is used to show photo grid
import PhotoLayout from "./components/PhotoLayout";

class App extends React.Component {

  constructor(props) {
    super(props);
    // save photo data and search value as state objects
    this.state = {
      photosData:[],
      searchValue:''
    };
    this.getSearchValue = this.getSearchValue.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  // SearchLayout returns search value
  getSearchValue(searchValue) {
    if(searchValue.length > 0){
      this.setState({searchValue:searchValue,currentPage:1,photosData: []});
      this.searchQuery();
    }
    else{
      // console.log('No search item');
      return;
    }
  }

  // standard method to get data from flicker api  
  searchQuery(){
    // developer api key
    const flickrApiKey = "a040aba6a975d777188c60fe7843b5c8";
    let url = `https://api.flickr.com/services/rest/?api_key=${flickrApiKey}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=50&page=${this.state.currentPage}&text=${this.state.searchValue}`;

    // set requesting data true to show loader
    this.setState({
      isRequestingPhotos: true
    });

    // global variable to match right set of data for search value
    this.waitingFor = this.state.searchValue;

    // check internet connection 
    if(navigator.onLine){
      fetch(url)
      .then(response => {
        // console.log(response);
        // if data returnd successfully
        if(response.status === 200){
          // console.log(this.state.searchValue);
          if(this.state.searchValue){
            response.json()
            .then(data => {
              if(data.stat === "fail"){
                alert("Something went wrong, try with another");
              }
              else if(data.stat === "ok"){
                // console.log(data);
                let totalData = parseInt(data.photos.total);
                console.log('print search value after request');
                console.log(this.state.searchValue);
                console.log(this.waitingFor);

                if(totalData >0 && this.state.searchValue === this.waitingFor){
                  // console.log(data);
                  // append newData to previous data when user scrolls
                  let preData = this.state.photosData;
                  let newData = preData.concat(data.photos.photo);
                  this.setState({
                    isRequestingPhotos: false,
                    photosData: newData,
                    lastPage: data.photos.pages
                  });
                }
                else{
                  this.setState({
                    isRequestingPhotos: false
                  });
                  alert('No flickers images found, try with other string');
                }
              }
              else{
                console.log(data);
                this.setState({
                  isRequestingPhotos: false
                });
              }
            })
            .catch(error => {
              console.log(error);
              throw error;
            });
          }
        }
        else{
          console.log(response);
        }
      })
    }
    else{
      // console.log('Newtwork is not online');
      this.setState({
        isRequestingPhotos: false
      });
    }
  }

  // on scroll query for remaining images and fix search bar
  handleOnScroll(){
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    // check if scrolled to bottom and current page is less than last page 
    if (scrolledToBottom && this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage:this.state.currentPage+1})
      // send query fro next page
      this.searchQuery();
    }

    // fix search bar at top on scroll 
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 200,
    headerEl = document.getElementById("js-header");

    if (distanceY > shrinkOn) {
      headerEl.classList.add("smaller");
    } else {
      headerEl.classList.remove("smaller");
    }
  }

  // return loader if requesting data
  renderSpinner() {
    // console.log(this.state.isRequestingPhotos);
    if (this.state.isRequestingPhotos) {
      return (
        <div className="loader"></div>
        );
    }
  }


  render() {
    return (
      <div className="main-container">
        <header id="js-header">

          <SearchLayout
            getSearchValue={this.getSearchValue}
            isRequestingPhotos={this.state.isRequestingPhotos}
          />
        </header>

        {this.renderSpinner()}
      
        <PhotoLayout photosData={this.state.photosData}/>
      </div>
    );
  }
}

export default App
