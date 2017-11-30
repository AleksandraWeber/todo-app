import axios from 'axios';
import {
	API_URL,
	ERROR_TODO_MESSAGE,
	SUCCESS_TODO_MESSAGE,
	TODO_ERROR,
	CLEAR_DATA,
	TODO_ERROR_CLEAR,
	CLEAR_TIME,
	TODO_SUCCESS,
	TODO_SUCCESS_CLEAR,
	FETCH_TODO_LIST,
} from '../constants';

export function addNewToDo(name, description, createdAt, status, page, limit, sort){
	return async (dispatch) => {
		if(name){
			try {
				const res = await axios.post(`${API_URL}/todo`, { createdAt, name, description, status});
				dispatch({type: CLEAR_DATA});
				dispatch({type: TODO_SUCCESS, payload: SUCCESS_TODO_MESSAGE.ADD});
				dispatch(fetchToDoList(page, limit, sort));
				setTimeout(() => {
					dispatch({
						type: TODO_SUCCESS_CLEAR
					});
				}, CLEAR_TIME);
			} catch(error) {
				dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.SERVER_ERROR});
				setTimeout(() => {
					dispatch({
						type: TODO_ERROR_CLEAR
					});
				}, CLEAR_TIME);
			}
		}else{
			dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.EMPTY_INPUT});
			setTimeout(() => {
				dispatch({
					type: TODO_ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
  };
}

export function fetchToDoList(page, limit, sort){
	return async (dispatch) => {
		try {
			const todoList = await axios.get(`${API_URL}/todo`);
			const res = await axios.get(`${API_URL}/todo?page=${page}&limit=${limit}&sortBy=createdAt&order=${sort}`);
			dispatch({type: FETCH_TODO_LIST, payload: {length: todoList.data.length, result: res.data}});
		} catch(error) {
			dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.SERVER_ERROR});
			setTimeout(() => {
				dispatch({
					type: TODO_ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
  };
}

export function deteleItem(id, page, limit, sort){
	return async (dispatch) => {
		try {
			const res = await axios.delete(`${API_URL}/todo/${id}`);
			dispatch({type: TODO_SUCCESS, payload: SUCCESS_TODO_MESSAGE.DETELE});
			dispatch(fetchToDoList(page, limit, sort));
			setTimeout(() => {
				dispatch({
					type: TODO_SUCCESS_CLEAR
				});
			}, CLEAR_TIME);
		} catch(error) {
			dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.SERVER_ERROR});
			setTimeout(() => {
				dispatch({
					type: TODO_ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
  };
}


export function updateStatusItem(id, status, page, limit, sort){
	return async (dispatch) => {
		try {
			const res = await axios.put(`${API_URL}/todo/${id}`, { status });
			dispatch({type: TODO_SUCCESS, payload: SUCCESS_TODO_MESSAGE.STATUS});
			dispatch(fetchToDoList(page, limit, sort));
			setTimeout(() => {
				dispatch({
					type: TODO_SUCCESS_CLEAR
				});
			}, CLEAR_TIME);
		} catch(error) {
			dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.SERVER_ERROR});
			setTimeout(() => {
				dispatch({
					type: TODO_ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
  };
}

export function editItem(id, name, description, page, limit, sort){
	return async (dispatch) => {
		try {
			const res = await axios.put(`${API_URL}/todo/${id}`, { name, description });
			dispatch({type: TODO_SUCCESS, payload: SUCCESS_TODO_MESSAGE.EDIT});
			dispatch({type: CLEAR_DATA});
			dispatch(fetchToDoList(page, limit, sort));
			setTimeout(() => {
				dispatch({
					type: TODO_SUCCESS_CLEAR
				});
			}, CLEAR_TIME);
		} catch(error) {
			dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.SERVER_ERROR});
			setTimeout(() => {
				dispatch({
					type: TODO_ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
  };
}

export function searchNameInToDoList(search, page, limit, sort){
	return async (dispatch) => {
		try {
			const todoList = await axios.get(`${API_URL}/todo`);
			const res = await axios.get(`${API_URL}/todo?filter=${search}&page=${page}&limit=${limit}&sortBy=createdAt&order=${sort}`);
			dispatch({type: FETCH_TODO_LIST, payload: {length: todoList.data.length, result: res.data}});
		} catch(error) {
			dispatch({type: TODO_ERROR, payload: ERROR_TODO_MESSAGE.SERVER_ERROR});
			setTimeout(() => {
				dispatch({
					type: TODO_ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
  };	
}
