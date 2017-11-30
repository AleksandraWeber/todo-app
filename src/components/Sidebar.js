import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { URL } from '../constants';
import { logOut } from '../actions/authActions'

class Sidebar extends Component {


	logOut = () => {
		this.props.logOut();
	}

	render(){
		return (
			<div className="col s12 m4 l3">
					<div className="collection z-depth-5">
						<NavLink
							exact
							to={URL.home_url}
							className="collection-item"
							activeClassName={'active'}
						>
							{URL.home}
						</NavLink>
						{!this.props.auth && 
							<NavLink
								exact
								to={URL.login_url}
								className="collection-item"
								activeClassName={'active'}
							>
								{URL.login}
							</NavLink>
						}
						{this.props.auth && 
							<a
								style={{cursor: 'pointer'}}
								className="collection-item"
								onClick={this.logOut}
							>
								{URL.logout}
							</a>
						}
					</div>
			</div>
		);
	}	
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.status,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => {dispatch(logOut())},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
