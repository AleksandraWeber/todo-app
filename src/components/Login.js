import React, { Component } from 'react';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { errorEmptyInputs, initAuth } from '../actions/authActions';

class About extends Component {

	constructor(props){
		super(props);
		this.state = {
			login: '',
			password: '',
		};
	}

	componentWillMount() {
		if (this.props.auth) {
			this.props.history.push(URL.home_url);
		}
	}

	componentWillUpdate(nextProps) {
		if (nextProps.auth) {
			this.props.history.push(URL.home_url);
		}
	}

	login = (event) => {
		this.setState({login: event.target.value.trim()});
	};

	password = (event) => {
		this.setState({password: event.target.value.trim()});
	};

	initAuth = () => {
		if(this.state.login && this.state.password){
			this.props.initAuth(this.state, this.props.history);
		}else{
			this.props.errorEmptyInputs();
		}
	}

  render() {
    return (
      <div>
				<div className="row">
					<br />
					<div className="col s6">
						<input onChange={this.login} id="login" type="text"  placeholder="Login"/>
					</div>
					<div className="col s6">
						<input onChange={this.password} id="password" type="password" placeholder="Password"/>
					</div>
					<button
						onClick={this.initAuth}
						className="btn waves-effect waves-light"
					>
						Submit
					</button>
					{this.props.error &&
						<div className="card-panel">
							<span className="red-text text-darken-2">{this.props.error}</span>
						</div>
					}
				</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.status,
		error: state.auth.error,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		errorEmptyInputs: () => {dispatch(errorEmptyInputs())},
		initAuth: (params, history) => {dispatch(initAuth(params, history))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
