/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom';
import Beforeunload from 'react-beforeunload';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      token: this.props.location.state.token,
      auth: false,
      backHome: false
    };
  }

  componentDidMount() {
    const { token } = this.state;

    axios.get('http://127.0.0.1:8081/api/users/redirect', { headers: { Authorization: `Token ${token}` } })
      .then((response) => {
        if (response.data) {
          this.setState({ auth: true });
        }
      })
      .then((error) => {
        console.log(error);
      });
  }

  render() {
    const { auth, token, backHome } = this.state;
    let back;
    if (backHome) {
      back = <Redirect to="/" />;
    }
    if (auth) {
      return (
        <div>
          {back}
          <Beforeunload onBeforeunload={() => { this.setState({ backHome: true }); }} />
          <h2>You are Authorized! Your Token is: {token}</h2>
        </div>
      );
    }
    return (
      <div>
        <Beforeunload onBeforeunload={() => { this.setState({ backHome: true }); }} />
        <h2>Authorization Failed! Your Token is: {token}</h2>
      </div>
    );
  }
}