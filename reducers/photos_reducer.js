import {
  RECEIVE_PHOTO,
} from '../actions/photo_actions';

const NotesReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = state.slice();

  switch(action.type) {
    case RECEIVE_PHOTO:
      newState.unshift(action.photo)
      return newState;
    default:
      return state;
  }
};

export default NotesReducer;