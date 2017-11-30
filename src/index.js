import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Todo from './components/Todo';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import { URL, LOG_IN } from './constants';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const token = localStorage.getItem('app_auth_token');
if(token) {
  store.dispatch({ type: LOG_IN });
}

ReactDOM.render(
<Provider store={store}>
	<BrowserRouter>
		<div className="had-container">
			<div className="row">
				<Sidebar />
				<div className="col s12 m8 l9">
					<Switch>
						<Route exact path={URL.home_url} component={Todo} />
						<Route exact path={URL.login_url} component={Login} />
						<Route component={ErrorPage} />
					</Switch>
				</div>
			</div>
		</div>
	</BrowserRouter>
</Provider>
, document.getElementById('root'));

registerServiceWorker();
