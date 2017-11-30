import React, { Component } from 'react';
import { URL } from '../constants';

class ErrorPage extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.history.push(URL.home_url);
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>ERROR 404</h1>
        <h2>Page not found</h2>
      </div>
    );
  }
}

export default ErrorPage;
