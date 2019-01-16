/* eslint-disable no-return-assign */
import React, {
  Component
} from 'react';
import {
  Redirect
} from 'react-router-dom';
import '../styles/app.css';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      token: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }


  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    const {
      email,
      password
    } = this.state;
    axios.post('http://127.0.0.1:8081/api/users/login', { user: { email, password } })
      .then((response) => {
        this.setState({ redirect: true, token: response.data.user.token });
      })
      .then((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    const {
      redirect, email, password, token
    } = this.state;
    let reroute;
    if (redirect) {
      reroute = (
        <Redirect to={{
          pathname: '/dash',
          state: { token }
        }}
        />
      );
    }
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} method="POST">
          {reroute}
          <input value={email} onChange={this.handleEmail} type="text" placeholder="Email" name="email" />
          <input value={password} onChange={this.handlePassword} type="password" placeholder="Password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}