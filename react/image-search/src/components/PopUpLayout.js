import React from "react";

class PopUpLayout extends React.Component {
  render() {
    let selImage = this.props.individualImage;
    let content = selImage.title;
    let src = `https://farm${selImage.farm}.staticflickr.com/${selImage.server}/${selImage.id}_${selImage.secret}_z.jpg`;
    console.log(content);
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <button className='close' onClick={this.props.closePopup}></button>
          <div className='left'>
          <img className='popup-image' src={src} alt={selImage.title}/>
          </div>
          <div className='right'>
          <div>{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUpLayout;