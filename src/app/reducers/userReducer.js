import {
  GET_CURRENT_USER,
  UPDATE_USER,
} from '../actions/types';

export default (state = { profileImage: null }, action) => {
  switch(action.type) {
      case GET_CURRENT_USER:
          return state;
      case UPDATE_USER:
          return {
              ...state,
              profileImage: action.user
          };
      default:
          return state;
  }
}
