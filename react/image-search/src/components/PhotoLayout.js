
import React from "react";
import PopUpLayout from "./PopUpLayout";

class PhotoLayout extends React.Component {

  constructor() {
    super();
    this.state = {
      showPopup: false,
      currentImage:{}
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
  }

  componentDidMount(){
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.toggleImage();
    });
  }

  // show image on pop up
  toggleImage(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleOnClick(e,photo){
    e.preventDefault();
    // console.log(e);
    // console.log(photo);

    this.setState({
      currentImage: photo
    });
    this.toggleImage();
  }

  // return photo grid through looping all photos
  renderPhotos() {
    let photos = this.props.photosData.map(photo => {
      let src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;

      // let src = photo.url_m;
      return (
        <div
        className="photo-grid__photo-container"
        key={photo.id}
        >
        <a href={src}  onClick={(e) => this.handleOnClick(e,photo)}>
        <img
        className="photo"
        src={src}
        alt={photo.title}
        />
        </a>

        
        </div>
        );
    });
    return photos;
  }

  

  render (){
    let selImage = this.state.currentImage;
    return (

      <div className="photo-grid">
      {this.renderPhotos()}
      {this.state.showPopup ? 
        <PopUpLayout
        individualImage={selImage}
        text='Close Me'
        closePopup={() => this.toggleImage()}
        />
        : null
      }
      </div>
      );
    }

  }

  export default PhotoLayout;
