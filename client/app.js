import React from 'react';
import Form from './form';

const App = () => {
  return (
    <div id="all-content">
      <div class="header">
        <img src="./logo.png" id="logo" />
        <h1>Can I Wipe With This?</h1>
      </div>
      <Form />
    </div>
  );
};

export default App;
