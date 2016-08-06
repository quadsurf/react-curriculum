import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { checked: false };
  },

  handleChange(event) {
    const nextChecked = event.target.checked;

    this.setState({ checked: nextChecked });
  },

  render() {
    return <div>
      <div>
        {"I'm changeable and under React's control."}
        <input
          checked={this.state.checked}
          onChange={this.handleChange}
          type="checkbox"
        />
      </div>

      <div>
        {"I'm read-only, am under React's control, but raise a warning."}
        <input
          checked={true}
          type="checkbox"
        />
      </div>

      <div>
        {"I'm changeable but am not under React's control."}
        <input
          defaultChecked={true}
          type="checkbox"
         />
      </div>

      <div>
        {"I'm read-only and under React's control."}
        <input
          checked={true}
          readOnly="true"
          type="checkbox"
        />
      </div>
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
