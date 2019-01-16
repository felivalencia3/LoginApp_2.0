import React, { Component } from 'react';

export default class Home extends Component {
  state = {
    foo: true
  }

  render() {
    const { foo } = this.state;
    if (foo) {
      return (
        <h2>Home</h2>
      );
    }
    return <h1>Home</h1>;
  }
}