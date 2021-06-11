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
    // console.log('load image file target: ', event.target.files[0]);
    const imgFile = event.target.files[0];

    const reader = new FileReader();
    const form = this;
    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        img.src = reader.result;
        // console.log('image source in load file: ', img.src);
        form.setState({ imgFile: reader.result.split(',')[1] });
      },
      false
    );
    if (imgFile) {
      reader.readAsDataURL(imgFile);
    }

    // img.src = URL.createObjectURL(event.target.files[0]);
    // this.setState({ imgFile: img.src });
  }

  loadImageLink(event) {
    const imgElement = document.getElementById('output');
    imgElement.src = event.target.value;
    console.log('load image link event listenter: ', event.target.value);
    const imgFile = event.target.value;
    this.setState({ imgUrl: imgFile });
  }

  handleSubmit(event) {
    let image = undefined;
    if (this.state.imgUrl) {
      image = this.state.imgUrl;
    } else {
      image = this.state.imgFile;
    }
    event.preventDefault();
    console.log('HERE in form handle submit with state: ', this.state);
    // console.log('image passing into idPoisonIvy: ', image);
    this.props.idPoisonIvy(image);
  }

  render() {
    console.log('form props: ', this.props);
    const prob = this.props.probability;
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <div class="img-section">
          <label htmlFor="image-upload">Image:</label>
          <input
            name="image-upload"
            type="file"
            accept="image/*"
            onChange={this.loadImageFile}
          />
        </div>
        <div class="img-section">
          <label htmlFor="image-url">Image link: </label>
          <input
            name="image-url"
            type="text"
            onChange={this.loadImageLink}
          ></input>
        </div>
        <img id="output" />
        <button id="check-image-button">
          Find out if this is a good choice of TP
        </button>
        {prob ? (
          prob > 10 ? (
            <h1 className="result" id="high-prob">
              Find a new leaf! {this.props.probability}% chance this is poison
              ivy
            </h1>
          ) : (
            <h1 className="result" id="low-prob">
              Wipe away! {this.props.probability}% chance this is poison ivy
            </h1>
          )
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
