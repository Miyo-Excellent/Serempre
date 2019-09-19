// Action Types
import {ADD_TASK} from '../actionTypes';

const initialState = {
  colors: {
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function themesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
