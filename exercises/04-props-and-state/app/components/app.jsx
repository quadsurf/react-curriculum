import Book from 'components/book';
import React from 'react';

const App = React.createClass({
  getInitialState() {
    return {
      books: [
        'A Game of Thrones',
        'Snow Crash',
        'The Martian'
      ]
    };
  },

  updateBook(index, value) {
    const nextBooks = this.state.books;

    nextBooks[index] = value;

    this.setState({ books: nextBooks });
  },

  render() {
    return <div>
      {this.state.books.map((book, index) => {
        return <Book
          book={book}
          index={index}
          key={index}
          updateBook={this.updateBook}
        />;
      })}
    </div>;
  }
});

export default App;
