import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.loadImage = this.loadImage.bind(this);
  }

  //display image after uploading
  loadImage(event) {
    const img = document.getElementById('output');
    img.src = URL.createObjectURL(event.target.files[0]);
  }

  render() {
    return (
      <div id="form">
        <h3>Upload image to find out if you're safe</h3>
        <div id="img-section">
          <label htmlFor="image-upload">Image:</label>
          <input
            name="image-upload"
            type="file"
            accept="image/*"
            onChange={this.loadImage}
          />
        </div>
        <img id="output" />
        <button>Find out if this is a good choice of TP</button>
      </div>
    );
  }
}

export default Form;
