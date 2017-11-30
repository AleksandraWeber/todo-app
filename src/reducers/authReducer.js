import {
  LOG_IN,
  LOG_OUT,
  ERROR_EMPTY_INPUTS,
  ERROR_INVALID_INPUTS,
  ERROR_CLEAR,
  ERROR_LOGIN_MESSAGE
} from '../constants';

const initialState = {
  status: false,
  error: ''
};

export default function authReducer(state=initialState, action) {
	switch(action.type) {
    case LOG_IN:
      return {...state, status: true};
      break;
    case LOG_OUT:
      return {...state, status: false};
      break;
    case ERROR_EMPTY_INPUTS:
      return {...state, error: ERROR_LOGIN_MESSAGE.ERROR_EMPTY_INPUTS};
      break;
    case ERROR_INVALID_INPUTS:
      return {...state, error: ERROR_LOGIN_MESSAGE.ERROR_INVALID_INPUTS};
      break;
    case ERROR_CLEAR:
      return {...state, error: initialState.error};
      break; 
    default:
      return state;
      break;
  }
}