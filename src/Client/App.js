import React from 'react';
import {
  BrowserRouter as Router, Route, Link, Redirect
} from 'react-router-dom';
import './styles/app.css';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

export default class App extends React.Component {
  state = {
    redirect: false
  }

  mouseLeave() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    let toHome;
    if (redirect) {
      toHome = <Redirect to="/" />;
    }
    return (
      <Router>
        <div onMouseLeave={this.mouseLeave}>
          <div className="topnav">
            <a><Link to="/">Home</Link></a>
            <a><Link to="/up">Sign-up</Link></a>
            <Login />
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/dash" component={Dashboard} />
          <Route path="/up" component={SignUp} />
        </div>
      </Router>
    );
  }
}
