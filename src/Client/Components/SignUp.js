import React, { Component } from 'react';
import '../styles/signup.css';
import {
  Redirect
} from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {
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

  componentDidMount() {
    const script1 = document.createElement('script');
    script1.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
    script1.integrity = 'sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=';
    script1.crossOrigin = 'anonymous';
    script1.async = true;
    document.body.appendChild(script1);
    const script = document.createElement('script');
    script.src = '../src/Client/scripts/signup.js';
    script.async = true;
    document.body.appendChild(script);
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
    axios.post('http://127.0.0.1:8081/api/users/', { user: { email, password } })
      .then((response) => {
        console.log(response.data);
        alert('Your account has been created.');
        // eslint-disable-next-line prefer-destructuring
        const token = response.data.user.token;
        this.setState({ redirect: true, token });
      })
      .catch((error) => {
        alert(error);
      });
    event.preventDefault();
  }


  render() {
    const {
      email, password, redirect, token
    } = this.state;
    let toDashboard;
    if (redirect) {
      toDashboard = (
        <Redirect to={{
          pathname: '/dash',
          state: { token }
        }}
        />
      );
    }
    return (
      <div id="upbody">
        {toDashboard}
        <form id="upform" action="#" method="post" onSubmit={this.handleSubmit}>
          <h2 id="formh2">Sign Up</h2>
          <p className="formp">
            <label htmlFor="Email" className="floatLabel">Email</label>
            <input onChange={this.handleEmail} value={email} className="forminput" id="Email" name="Email" type="text" />
          </p>
          <p className="formp">
            <label htmlFor="password" className="floatLabel">Password</label>
            <input onChange={this.handlePassword} value={password} className="forminput" id="password" name="password" type="password" />
            <span>Enter a password longer than 6 characters</span>
          </p>
          <p className="formp">
            <label htmlFor="confirm_password" className="floatLabel">Confirm Password</label>
            <input className="forminput" id="confirm_password" name="confirm_password" type="password" />
            <span>Your passwords do not match</span>
          </p>
          <p className="formp">
            <input className="forminput" type="submit" value="Create My Account" id="submit" />
          </p>
        </form>
      </div>
    );
  }
}