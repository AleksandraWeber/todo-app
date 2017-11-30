export const API_URL = 'https://5a1ea4a41dc90f0012802221.mockapi.io/api/todo-v1';

export const URL = {
	home: 'Todo APP',
	home_url: '/',
	login: 'Login',
	login_url: '/login/',
	logout: 'Logout',
};

export const USER_AUTH = {
	login: 'ola',
	password: 'ola.1234',
	secret: 'todoapp'
}

export const CLEAR_TIME = 3000;

/** AUTH START **/
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const ERROR_EMPTY_INPUTS = 'ERROR_EMPTY_INPUTS';
export const ERROR_INVALID_INPUTS = 'ERROR_INVALID_INPUTS';
export const ERROR_CLEAR = 'ERROR_CLEAR';
export const ERROR_LOGIN_MESSAGE = {
	ERROR_EMPTY_INPUTS: 'Empty login and password',
	ERROR_INVALID_INPUTS: 'Incorrect login and password'
};
/** AUTH END **/


/** TODO START **/
export const TODO_ERROR = 'TODO_ERROR';
export const CLEAR_DATA = 'CLEAR_DATA';
export const TODO_ERROR_CLEAR = 'TODO_ERROR_CLEAR';
export const TODO_SUCCESS = 'TODO_SUCCESS';
export const TODO_SUCCESS_CLEAR = 'TODO_SUCCESS_CLEAR';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const ERROR_TODO_MESSAGE = {
	EMPTY_INPUT: 'Add ToDo Name',
	SERVER_ERROR: 'Server Error',
}
export const SUCCESS_TODO_MESSAGE = {
	ADD: 'New todo item has been added',
	DETELE: 'Todo item has been deleted',
	STATUS: 'Todo item status has been updated',
	EDIT: 'Todo items has been edited'
}
/** TODO END **/
