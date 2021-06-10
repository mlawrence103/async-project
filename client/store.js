import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
];

const ID_POISON_IVY = 'ID_POISON_IVY';

export const _idPoisonIvy = (probability) => {
  console.log('here in _idPosionIvy creator with probability: ', probability);
  return {
    type: ID_POISON_IVY,
    probability,
  };
};

export const idPoisonIvy = (image) => {
  //do you need to take out the "blob:" part of the img src?
  console.log('HERE in id poisonIvy in store with image: ', image);
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/check-image', image);
      console.log('response in store: ', res.data.data.concepts);
      console.log(
        'likelihood of poison ivy: ',
        res.data.data.concepts[0].value
      );
      const poisonIvyProb = res.data.data.concepts[0].value * 100;
      dispatch(_idPoisonIvy(poisonIvyProb));
    } catch (error) {
      console.log(error);
    }
  };
};

function reducer(state = undefined, action) {
  switch (action.type) {
    case ID_POISON_IVY:
      return action.probability;
    default:
      return state;
  }
}

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
