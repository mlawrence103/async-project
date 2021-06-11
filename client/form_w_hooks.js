import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { idPoisonIvy } from './store';

export default function FormHooks() {
  const [img, setImg] = useState(undefined);
  const [imgFile, setImgFile] = useState(undefined);
  const dispatch = useDispatch();
  const prob = useSelector((state) => state);

  console.log('prob from useSelector hook: ', prob);
  console.log('returned from useDispatch: ', dispatch);

  const loadImageFile = (event) => {
    const file = event.target.files[0];
    const imgPreview = URL.createObjectURL(file);
    const imgElement = document.getElementById('output');
    imgElement.src = imgPreview;
    console.log('load image file event target: ', file);
    setImgFile(file);
  };

  const loadImageLink = (event) => {
    console.log('load image link event listenter: ', event.target.value);
    setImg(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('image passing into idPoisonIvy: ', imgFile);
    dispatch(idPoisonIvy(imgFile));
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <div className="img-section">
        <label htmlFor="image-upload">Image:</label>
        <input
          name="image-upload"
          type="file"
          accept="image/*"
          onChange={loadImageFile}
        />
      </div>
      <div className="img-section">
        <label htmlFor="image-url">Image link: </label>
        <input name="image-url" type="text" onChange={loadImageLink}></input>
      </div>
      <img id="output" />
      <button id="check-image-button">
        Find out if this is a good choice of TP
      </button>
      {prob ? (
        prob > 10 ? (
          <h1 className="result" id="high-prob">
            Find a new leaf! {prob}% chance this is poison ivy
          </h1>
        ) : (
          <h1 className="result" id="low-prob">
            Wipe away! {prob}% chance this is poison ivy
          </h1>
        )
      ) : (
        <div></div>
      )}
    </form>
  );
}
