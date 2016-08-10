import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { value: "I'm changeable and under React's control" };
  },

  handleChange(event) {
    const nextValue = event.target.value;

    this.setState({ value: nextValue });
  },

  render() {
    return <div>
      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.value}
      />

      <input
        type="text"
        value="I'm read-only, am under React's control, but raise a warning."
      />

      <input
        defaultValue="I'm changeable but am not under React's control."
        type="text"
      />

      <input
        readOnly={true}
        type="text"
        value="I'm read-only and under React's control."
      />
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
