import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { value: 'no' };
  },

  handleChange(event) {
    const nextValue = event.target.value;

    this.setState({ value: nextValue });
  },

  render() {
    return <div>
      <div>
        {"We're changeable and under React's control."}
        <input
          checked={this.state.value === 'yes'}
          onChange={this.handleChange}
          type="radio"
          value="yes"
        />
        <input
          checked={this.state.value === 'no'}
          onChange={this.handleChange}
          type="radio"
          value="no"
        />
      </div>

      <div>
        {"We're read-only, are under React's control, but raise a warning."}
        <input
          checked={true}
          name="1"
          type="radio"
          value="yes"
        />
        <input
          checked={false}
          name="1"
          type="radio"
          value="no"
        />
      </div>

      <div>
        {"We're changeable but are not under React's control."}
        <input
          defaultChecked={true}
          name="2"
          type="radio"
          value="yes"
        />
        <input
          defaultChecked={false}
          name="2"
          type="radio"
          value="no"
        />
      </div>

      <div>
        {"We're read-only and are under React's control."}
        <input
          checked={true}
          name="3"
          readOnly="true"
          type="radio"
          value="yes"
        />
        <input
          checked={false}
          name="3"
          readOnly="true"
          type="radio"
          value="no"
        />
      </div>
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
