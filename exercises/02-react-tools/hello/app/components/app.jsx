import React from 'react';

const App = React.createClass({
  getInitialState() {
    return { who: 'world' };
  },

  handleChange(event) {
    const nextState = { who: event.target.value };

    this.setState(nextState);
  },

  render() {
    let message;

    if (this.state.who.trim() === '') {
      message = 'Hello?';
    }
    else {
      message = `Hello ${this.state.who}`;
    }

    return <div>
      <h1>{message}</h1>
      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

export default App;
