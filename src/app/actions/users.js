import {
  GET_CURRENT_USER,
  UPDATE_USER,
} from './types';

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
})

export const updateCurrentUser = (user) => ({
  type: UPDATE_USER,
  user
})
