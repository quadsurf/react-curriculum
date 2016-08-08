import React from 'react';

const Book = React.createClass({
  handleChange(event) {
    this.props.updateBook(this.props.index, event.target.value);
  },

  render() {
    return <div>
      <h2>Book {this.props.index}: {this.props.book}</h2>

      <input
        onChange={this.handleChange}
        type="text"
        value={this.props.book}
      />
    </div>;
  }
});

export default Book;
