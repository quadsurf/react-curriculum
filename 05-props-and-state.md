#### [⇐ Previous](04-synthetic-events.md) | [Table of Contents](README.md#table-of-contents) | [Next ⇒](06-component-life-cycle.md)

# Props and State

- Understand what props and states are and how they're used within component classes
- Define propTypes and see how they are used

| Duration by yourself | Duration as a class |
|----------------------|---------------------|
| TBD                  | TBD                 |

## What are props and why are they important?

As you've seen, **props** are data that's passed into a `ReactElement` object when it's created. For example, you can use props to pass in HTML attributes when creating an HTML tag element.

```jsx
var element = <p className="bold">Tokyo Dog</p>;
```

You can also use props to pass in *immutable*, or unchangeable, data when creating a component class element. This data, which is accessible anywhere inside a component class via the `this.props` object, is used to configure a new component before it's mounted (i.e. inserted into the DOM). After a component's props are set, they never change.

```jsx
var Hello = React.createClass({
  render: function() {
    return <h1>{this.props.greeting} world</h1>;
  }
});

ReactDOM.render(
  <Hello greeting='Hello' />,
  document.getElementById('hello')
);
```

Every component has their own `this.props` object which is just a plain, old JavaScript object. But remember, the key-value pairs inside `this.props` are immutable. That means `this.props` is not a good location for storing data that's received *after* the component has been mounted. For that, you need to look elsewhere...

## What is state and why is it important?

**State** is *mutable*, or changeable, data that's initialized and updated from within a component class element. This data, which is accessible anywhere inside a component class via the `this.state` object, is initialized by the `getInitialState` function that, when present, is automatically invoked *once* before a component is mounted. A component's state is updated by event handlers that receive data from events like user input or server responses.

```jsx
var Hello = React.createClass({
  getInitialState: function() {
    return { who: 'world' };
  },

  handleChange: function(event) {
    var nextState = { who: event.target.value };
    this.setState(nextState);
  },

  render: function() {
    return <div>
      <h1>Hello {this.state.who}</h1>
      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

ReactDOM.render(
  <Hello />,
  document.getElementById('hello')
);
```

Every component has their own `this.state` object which is just a plain, old JavaScript object. And because the key-value pairs inside `this.state` are mutable, they're the perfect location for storing data that changes over time. However, always use the `this.setState` function to merge `nextState` into `this.state` because, after the merge, the component is automatically re-rendered.

## How are props and state used together?

When mounting a component, React uses one-way data binding to combine a component's props, state, and presentation logic into a user interface. It may help to think of the data inside of `this.props` and `this.state` as inputs for a component's `render` function.

```jsx
var Hello = React.createClass({
  getInitialState: function() {
    return { who: 'world' };
  },

  handleChange: function(event) {
    var nextState = { who: event.target.value };
    this.setState(nextState);
  },

  render: function() {
    var message;

    if (this.state.who.trim() === '') {
      message = this.props.greeting + '?';
    } else {
      message = this.props.greeting + ' ' + this.state.who;
    }

    return <div>
      <h1>{message}</h1>
      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

ReactDOM.render(
  <Hello greeting="Hello" />,
  document.getElementById('hello')
);
```

When a user inputs new data, the component updates its `this.state` object  using the `this.setState` function. The new `this.state` and the unchanged `this.props` are automatically recombined with the presentation logic of the `render` function and a new user interface is produced.

Remember, the `render` function is a pure function. In other words, it should return the same `ReactElement` given the same `this.props` and `this.state` objects. Keeping the `render` function pure makes components easier to reason about.

### Exercise

Type this out and write stuff in your own words.

## How do you separate components by concern?

When building larger React applications, it becomes important to create modular components with well-defined interfaces. While you can separate the different concerns of your application however you want, professional React developers tend think of components in two ways—those that are stateful and those that are stateless.

A **stateful component** may have props but it definitely has state. Typically, a stateful component is at or near the root of a component hierarchy and manages the majority of the hierarchy's state. As the manager, it's responsible for updating its internal state when events are generated by a user or by a server. Clearly, stateful components are a requirement for an interactive application, but a component hierarchy should avoid having too many of them.

A **stateless component** often has props but it definitely has *no* state. Typically, a stateless component is at or near the leaves of a component hierarchy and is responsible for the majority of the hierarchy's presentation logic. Since mutable state increases complexity and reduces predictability, stateless components with only immutable props are easier to think about. Whenever it's time to update the DOM, they build the user interface using the data they're given from the root of the hierarchy. More often then not, an application will have more stateless components than stateful components. They can have event handlers, but they can't update the component's state. That's because they have none! In order to update the component hierarchy's state, they have to tell the stateful components that there is new state for them to process.

```jsx
var Book = React.createClass({
  handleChange: function(event) {
    this.props.updateState(this.props.index, event.target.value);
  },

  render: function() {
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

var Books = React.createClass({
  getInitialState: function() {
    return {
      books: ['The Lord of the Rings', "Ender's Game"]
    }
  },

  updateState: function(index, value) {
    var nextBooks = this.state.books;
    nextBooks[index] = value;
    this.setState({ books: nextBooks });
  },

  render: function() {
    var bookEls = this.state.books.map(function(book, index) {
      return <Book
        book={book}
        index={index}
        key={index}
        updateState={this.updateState}
      />;
    }, this);

    return <div>{bookEls}</div>;
  }
});

ReactDOM.render(
  <Books />,
  document.getElementById('books')
);
```

The first component class is the `Book` class. We know it's a stateless component because it doesn't have a `getInitialState` function.

The `Books` component is stateful while the `Book` component is stateless. We know that for two reasons.

1. The `Books` component class has a `getInitialState` function.
2. The `Books` component class has a `render` function that creates `Book` components and sets their `props`.

Instance of `Books` are said to **own** instances of `Book` because, in React, an **owner** is the component that sets the props of other components. You can also saw that instances of `Book` are composed by instances of `Books`.

In React, data flows from owner to owned component through props as discussed above. This is effectively one-way data binding: owners bind their owned component's props to some value the owner has computed based on its props or state. Since this process happens recursively, data changes are automatically reflected everywhere they are used.

[DESCRIBE UPDATESTATE FUNCTION]

[DESCRIBE AUTOBINDING]

Before being triggered, event handlers are automatically bound to a component instance. In other words, when an event handler is invoked, the `this` variable inside the function refers to the component that defines the event handler. In React, this is known as **autobinding** and will make more sense when you start building larger React applications.

**NOTE:** Autobinding only works when registering event handlers inside component classes created by the `React.createClass()` function and *not* with the ES2015 `class` syntax.

### Exercise

Type this out and write stuff in your own words.

If we look in the chrome console we see the following warning:

"Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of BookList. See https://fb.me/react-warning-keys for more information."

Check out [this](http://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js) stackoverflow for why this is encouraged by React. How can we refactor our previous example to remove this warning?

Hint: We are using `map` to iterate over our array. The callback function to map takes in additional parameters including the index, can we use that as our unique key to remove the warning?

## Summary

Words, mouth, memories.

## Assignment

![Library React application](https://dl.dropboxusercontent.com/s/x7ngbdut6c4y7cc/89E7F513-94B8-4A70-BFE5-1BD3474376CE-40520-00014657557D2F38.gif?dl=0)

## References

* [GitHub - props vs state by uberVU](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [React docs - Component Life Cycle](https://facebook.github.io/react/docs/component-specs.html)
* [React docs - Multiple Components](https://facebook.github.io/react/docs/multiple-components.html)

#### [⇐ Previous](04-synthetic-events.md) | [Table of Contents](README.md#table-of-contents) | [Next ⇒](06-component-life-cycle.md)
