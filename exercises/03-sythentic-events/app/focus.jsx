import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { value: "I'm blurred :(" };
  },

  handleBlur() {
    const nextValue = "I'm blurred :(";

    this.setState({ value: nextValue });
  },

  handleFocus() {
    const nextValue = "I'm focused :D";

    this.setState({ value: nextValue });
  },

  render() {
    return <div>
      <input
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        readOnly={true}
        value={this.state.value}
      />
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
