import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { password: '', username: '' };
  },

  handleChange(event) {
    const nextState = {};

    nextState[event.target.name] = event.target.value;

    this.setState(nextState);
  },

  handleSubmit(event) {
    event.preventDefault();

    // Perhaps send a JSON string to a server...
    JSON.stringify({
      password: this.state.password,
      username: this.state.username
    });
  },

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        Username:
        <input
          name="username"
          onChange={this.handleChange}
          type="text"
          value={this.state.username}
        />

        Password:
        <input
          name="password"
          onChange={this.handleChange}
          type="password"
          value={this.state.password}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
