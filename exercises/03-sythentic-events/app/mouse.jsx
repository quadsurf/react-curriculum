import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return {
      clicks: 0,
      location: null,
      pageX: null,
      pageY: null
    };
  },

  handleClick() {
    const nextClicks = this.state.clicks + 1;

    this.setState({ clicks: nextClicks });
  },

  handleMouseEnter() {
    this.setState({ location: 'Entered' });
  },

  handleMouseLeave() {
    this.setState({ location: 'Left' });
  },

  handleMouseMove(event) {
    const nextPageX = event.pageX;
    const nextPageY = event.pageY;

    this.setState({ pageX: nextPageX, pageY: nextPageY });
  },

  render() {
    return <div>
      <div
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        style={{
          backgroundColor: 'lightblue',
          height: '300px',
          width: '300px'
        }}
      />

      <div>clicks: {this.state.clicks}</div>
      <div>location: {this.state.location}</div>
      <div>pageX: {this.state.pageX}</div>
      <div>pageY: {this.state.pageY}</div>
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
