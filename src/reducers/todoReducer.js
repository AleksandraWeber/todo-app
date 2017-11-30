import {
	CLEAR_DATA,
	TODO_ERROR,
	TODO_ERROR_CLEAR,
	TODO_SUCCESS,
	TODO_SUCCESS_CLEAR,
	FETCH_TODO_LIST,
} from '../constants';

const initialState = {
	error: '',
	success: '',
	clearData: false,
	toDoList: {
		length: 0,
		result: [],
	},
};

export default function todoReducer(state=initialState, action) {
	switch(action.type) {
    case TODO_ERROR:
      return {...state, error: action.payload};
			break;
		case TODO_ERROR_CLEAR:
      return {...state, error: initialState.error};
			break;
		case TODO_SUCCESS:
      return {...state, success: action.payload};
			break;
		case TODO_SUCCESS_CLEAR:
      return {...state, success: initialState.success};
			break;
		case CLEAR_DATA:
      return {...state, clearData: true};
			break;
		case FETCH_TODO_LIST:
			return {...state, toDoList: action.payload};
			break;
    default:
      return state;
      break;
  }
}