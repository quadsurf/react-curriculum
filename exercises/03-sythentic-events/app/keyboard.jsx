import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { events: [], value: '' };
  },

  handleChange(event) {
    const nextValue = event.target.value;

    this.setState({ value: nextValue });
  },

  handleClick() {
    this.setState({ events: [], value: '' });
  },

  handleKeyDown(event) {
    const nextEvents = this.state.events;

    nextEvents.push(`Key Down: ${event.which}`);

    this.setState({ events: nextEvents });
  },

  handleKeyPress(event) {
    const nextEvents = this.state.events;

    nextEvents.push(`Key Press: ${event.which}`);

    this.setState({ events: nextEvents });
  },

  handleKeyUp(event) {
    const nextEvents = this.state.events;

    nextEvents.push(`Key Up: ${event.which}`);

    this.setState({ events: nextEvents });
  },

  render() {
    const eventEls = this.state.events.map((event, index) => {
      return <div key={index}>{event}</div>;
    });

    return <div>
      <textarea
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        onKeyUp={this.handleKeyUp}
        value={this.state.value}
      />

      <button onClick={this.handleClick}>
        Clear
      </button>

      <h2>History</h2>

      {eventEls}
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
