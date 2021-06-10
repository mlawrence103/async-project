import React from 'react';
import { connect } from 'react-redux';
import { idPoisonIvy } from './store';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: undefined,
      imgFile: undefined,
    };
    this.loadImageFile = this.loadImageFile.bind(this);
    this.loadImageLink = this.loadImageLink.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //display image after uploading
  loadImageFile(event) {
    const img = document.getElementById('output');
    const imgFile = event.target.files[0];
    const reader = new FileReader();
    const form = this;
    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        img.src = reader.result;
        form.setState({ imgFile: img.src });
      },
      false
    );
    if (imgFile) {
      reader.readAsDataURL(imgFile);
    }
    // // img.src = URL.createObjectURL(event.target.files[0]);
    // await this.setState({ imgUrl: img.src });
  }

  loadImageLink(event) {
    console.log('load image link event listenter: ', event.target.value);
    const imgFile = event.target.value;
    this.setState({ imgUrl: imgFile });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('HERE in form handle submit with state: ', this.state);
    this.props.idPoisonIvy(this.state.imgUrl);
  }

  render() {
    console.log('form props: ', this.props);
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <h3>
          Don't wipe with poison ivy. Upload an image to check if you're safe
        </h3>
        <div class="img-section">
          <label htmlFor="image-upload">Image:</label>
          <input
            name="image-upload"
            type="file"
            accept="image/*"
            onChange={this.loadImageFile}
          />
        </div>
        <img id="output" />
        <div class="img-section">
          <label htmlFor="image-url">Image link: </label>
          <input
            name="image-url"
            type="text"
            onChange={this.loadImageLink}
          ></input>
        </div>
        <button id="check-image-button">
          Find out if this is a good choice of TP
        </button>
        {this.props.probability ? (
          <h1>Likelihood of poison ivy: {this.props.probability}</h1>
        ) : (
          <div></div>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state in map state: ', state);
  return {
    probability: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    idPoisonIvy: (img) => dispatch(idPoisonIvy(img)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
// export default Form;
