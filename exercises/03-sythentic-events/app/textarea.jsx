import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { value: "I'm changeable and under React's control." };
  },

  handleChange(event) {
    const nextValue = event.target.value;

    this.setState({ value: nextValue });
  },

  render() {
    return <div>
      <textarea
        onChange={this.handleChange}
        value={this.state.value}
      />

      <textarea
        value="I'm read-only, am under React's control, but raise a warning."
      />

      <textarea
        defaultValue="I'm changeable but am not under React's control."
      />

      <textarea
        readOnly="true"
        value="I'm read-only and under React's control."
      />
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
