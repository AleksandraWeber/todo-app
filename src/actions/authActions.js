import jwt from 'jwt-simple';
import {
  LOG_IN,
	LOG_OUT,
	URL,
  ERROR_EMPTY_INPUTS,
	ERROR_INVALID_INPUTS,
	CLEAR_TIME,
	ERROR_CLEAR,
	USER_AUTH
} from '../constants';
import { setTimeout } from 'timers';

export function logIn(){
	return {
		type: LOG_IN,
	}
}

export function logOut(){
	localStorage.clear();
	setTimeout(() => {
		window.location.reload();
	}, 100);
	return {
		type: LOG_OUT,
	}
}

export function errorEmptyInputs(){
	return (dispatch) => {
		dispatch({
			type: ERROR_EMPTY_INPUTS
		});
		setTimeout(() => {
			dispatch({
				type: ERROR_CLEAR
			});
    }, CLEAR_TIME);
	}
}

export function initAuth(params, history){
	return (dispatch) => {
		if(params.login === USER_AUTH.login && params.password === USER_AUTH.password){
			dispatch({type: LOG_IN});
			let payload = {login: params.login};
			let token = jwt.encode(payload, USER_AUTH.secret);
			localStorage.setItem('app_auth_token', token);
			history.push(URL.home_url);
		}
		else{
			dispatch({
				type: ERROR_INVALID_INPUTS
			});
			setTimeout(() => {
				dispatch({
					type: ERROR_CLEAR
				});
			}, CLEAR_TIME);
		}
	}
}