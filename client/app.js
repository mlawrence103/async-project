import React from 'react';
import Form from './form';
import FormHooks from './form_w_hooks';

const App = () => {
  return (
    <div id="all-content">
      <div className="header">
        <img src="./logo.png" id="logo" />
        <h1>Can I Wipe With This?</h1>
        <h3>
          Don't wipe with poison ivy. Upload an image to check if you're safe
        </h3>
      </div>
      <FormHooks />
    </div>
  );
};

export default App;
