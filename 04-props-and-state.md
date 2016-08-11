#### [⇐ Previous](03-synthetic-events.md) | [Table of Contents](README.md#table-of-contents) | [Next ⇒](05-component-life-cycle.md)

# Props and State

### Objectives

- Explain what props are.
- Explain what state is.
- Explain why props and state are important.
- Use props and state to separate the concerns of a React user interface.
- Explain how information flows between stateful and stateless components.

| Duration by yourself | Duration as a class |
|----------------------|---------------------|
| TBD                  | TBD                 |

## What are props?

**Props** are data that's passed into a component when it's created. For example, you can use props to pass in HTML attributes when creating a native HTML component.

```jsx
const element = <p className="bold">Tokyo Dog</p>;
```

Additionally, props are **immutable**, or unchangeable, data that configures a new component before it's mounted (i.e. inserted into the DOM hierarchy). Props are accessible anywhere inside a component class via the `this.props` object. After a component's props are set, they never change.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  render() {
    return <h1>{this.props.greeting} world</h1>;
  }
});

ReactDOM.render(
  <App greeting='Hello' />,
  document.getElementById('app')
);
```

Every component has their own `this.props` object. But remember, the key-value pairs inside `this.props` are immutable. That means `this.props` is not a good location for storing data that's received after a component has been mounted. For that, you need state.

### Exercise

Turn to a neighbor and, in your own words, explain what props are and how they're used. After about thirty seconds, your instructor will cold call on the class and ask what was discussed.

## What's state?

**State** is data that's initialized and updated from within a component. State is initialized by a component's `getInitialState()` method which is automatically invoked once before a component is mounted. Once initialized, state is accessible anywhere inside a component class via the `this.state` object.

Additionally, state is **mutable**, or changeable, data that represents the internal state of a component. To mutate state, you use the `this.setState()` method which is typically done after an event handler is triggered from a user interaction or a server response.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { who: 'world' };
  },

  handleChange(event) {
    const nextWho = event.target.value;

    this.setState({ who: nextWho });
  },

  render() {
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
  <App />,
  document.getElementById('app')
);
```

Every component has their own `this.state` object. And because the key-value pairs inside `this.state` are mutable, they're the perfect location for storing data that changes over time. Just remember to always use the `this.setState()` method to merge changes into the current `this.state` object. After the merge, the component is automatically re-rendered.

### Exercise

Turn to a neighbor and, in your own words, explain what state is and how it's used. After about thirty seconds, your instructor will cold call on the class and ask what was discussed.

## Why are props and state important?

Props and state are important because they're implicit inputs to the `render()` method. React invokes a component's `render()` method whenever it's mounted or its state is updated. Using one-way data binding, a component's props, state, and presentation logic are combined into a user interface.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { who: 'world' };
  },

  handleChange(event) {
    const nextWho = event.target.value;

    this.setState({ who: nextWho });
  },

  render() {
    return <div>
      <h1>{this.props.greeting} {this.state.who}</h1>

      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

ReactDOM.render(
  <App greeting="Hello" />,
  document.getElementById('app')
);
```

In the example above, the `ReactDOM.render()` method is instructed to mount an `<App />` component. The mounting process starts by instantiating a new `<App />` component and passing it a `{ greeting: 'Hello' }` props object. Then, the component's `getInitialState()` method is invoked which initializes its `{ who: 'world' }` state object.

```text
┌──────────────────── <App /> ────────────────────┐
│ ┌──────── Props ────────┐  ┌────── State ─────┐ │
│ │                       │  │                  │ │
│ │ { greeting: 'Hello' } │  │ { who: 'world' } │ │
│ │                       │  │                  │ │
│ └───────────────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────┘
```

Next, React invokes the component's `render()` method. The method combines the `this.props` and `this.state` objects with the component's presentation logic and returns a component hierarchy.

```text
              ┌── <div /> ──┐
              │             │
              │             │
              └─────────────┘
                     │
       ┌─────────────┴──────────────┐
       │                            │
       ▼                            ▼
┌─── <h1 /> ──┐    ┌───────────── <input /> ────────────┐
│             │    │ ┌───────────── Props ────────────┐ │
│ Hello world │    │ │ {                              │ │
│             │    │ │   onChange: this.handleChange, │ │
└─────────────┘    │ │   type: 'text',                │ │
                   │ │   value: 'world'               │ │
                   │ │ }                              │ │
                   │ └────────────────────────────────┘ │
                   └────────────────────────────────────┘
```


React uses the component hierarchy to generate and insert HTML elements into the DOM hierarchy.

```html
<div id="app">
  <div>
    <h1>Hello world</h1>
    <input type="text" value="world">
  </div>
</div>
```

Once mounting is complete, React holds onto the component hierarchy for later. You'll see why in a moment.

Now, the user interface waits patiently for a user to interact with it. When the `<input />` element is changed, the `onChange` event is fired and the component's `this.handleChange()` method is triggered. The event handler updates the component's state using the `this.setState()` method.

```text
┌────────────────────── <App /> ─────────────────┐
│ ┌──────── Props ────────┐  ┏━━━━━ State ━━━━━┓ │
│ │                       │  ┃                 ┃ │
│ │ { greeting: 'Hello' } │  ┃ { who: 'Jane' } ┃ │
│ │                       │  ┃                 ┃ │
│ └───────────────────────┘  ┗━━━━━━━━━━━━━━━━━┛ │
└────────────────────────────────────────────────┘
```

After updating the state, the component's `render()` method is invoked again, combining the immutable `this.props` object and the mutable `this.state` object with the component's presentation logic. As a result, a new component hierarchy is returned by the `render()` method.

```text
              ┏━━ <div /> ━━┓
              ┃             ┃
              ┃             ┃
              ┗━━━━━━━━━━━━━┛
                     │
       ┌─────────────┴──────────────┐
       │                            │
       ▼                            ▼
┏━━━ <h1 /> ━━┓    ┏━━━━━━━━━━━━━ <input /> ━━━━━━━━━━━━┓
┃             ┃    ┃ ┌───────────── Props ────────────┐ ┃
┃ Hello Jane  ┃    ┃ │ {                              │ ┃
┃             ┃    ┃ │   onChange: this.handleChange, │ ┃
┗━━━━━━━━━━━━━┛    ┃ │   type: 'text',                │ ┃
                   ┃ │   value: 'Jane'                │ ┃
                   ┃ │ }                              │ ┃
                   ┃ └────────────────────────────────┘ ┃
                   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

The new component hierarchy contains new `<div />`, `<h1 />`, and `<input />` components. React compares the old component hierarchy with the new component hierarchy and calculates the differences between the two. In this example, only the content of the `<h1 />` component and the `value` of the `<input />` component has changed. Then, React applies those differences to the DOM hierarchy updating only what's changed.

```html
<div id="app">
  <div>
    <h1>Hello Jane</h1>
    <input type="text" value="Jane">
  </div>
</div>
```

The process of calculating and applying differences is called **reconciliation** and is one of the primary reasons why React is so performant. Once updating the DOM hierarchy is complete, React holds onto the new component hierarchy for the next reconciliation round. A component's reconciliation process is easier to understand when its `render()` method is implemented as a **pure function**. In other words, it should:

1. Return the same component hierarchy given the same props and state objects.
1. Not modify the component's state directly or with the `this.setState()` method.
1. Not read from or write directly to the DOM.
1. Not interact with the browser via functions like `setTimeout()`.

React provides other places where you can modify state or interact with the browser, which you'll learn about later. Just not in the `render()` method.

### Exercise

Type out the above code example by hand and then run it. Resist the urge to copy-and-paste!

Then, turn to a neighbor and, in your own words, explain why props and state are important. After about a few minutes, your instructor will cold call on the class and ask what was discussed.

## How do you use props and state to separate the concerns of a React user interface?

When building a large React user interface, it becomes important to create modular components with well-defined concerns. While you're free to separate the different concerns of your user interface however you want, React components tend fall in one of two groups—either stateful or stateless.

A **stateful component** may have props but it definitely has state. Typically, a stateful component is at or near the root of a component hierarchy and is responsible for managing the majority of the hierarchy's state. Clearly stateful components are a requirement for interactivity. However, the fewer stateful components a hierarchy has, the easier it is to understand how information flows through it.

A **stateless component** often has props but it definitely has *no* state. Typically, a stateless component is at or near the leaves of a component hierarchy and is responsible for handling the majority of the hierarchy's events. A typical component hierarchy has more stateless components than stateful components, especially if it creates a user interface with lots of events.

Let's build a React user interface with both a both stateful and stateless component. To get started, create a new Brunch application.

```shell
brunch new props_and_state --skeleton ryansobol/with-react
```

And change into the project directory.

```shell
cd props_and_state
```

Watch the project for changes and launch an HTTP server.

```shell
npm start
```

In a new Terminal tab, navigate back to the project directory.

```shell
cd path/to/props_and_state
```

And open the project in Atom.

```shell
atom .
```

In the `app/components/track.jsx` file, type the following code.

```jsx
import React from 'react';

const Track = React.createClass({
  handleClick() {
    this.props.incrementLikes(this.props.track);
  },

  render() {
    return <div>
      <p>{this.props.track.title} - {this.props.track.artist}</p>

      <p>Likes: {this.props.track.likes}</p>

      <button onClick={this.handleClick}>Like</button>
    </div>;
  }
});

export default Track;
```

And in the `app/components/app.jsx` file, type the following code.

```jsx
import React from 'react';
import Track from 'components/track';

const App = React.createClass({
  getInitialState() {
    return {
      tracks: [{
        artist: 'The Beatles',
        likes: 0,
        title: 'Hey Jude'
      }, {
        artist: 'Adele',
        likes: 0,
        title: 'Hello'
      }]
    };
  },

  incrementLikes(track) {
    const nextTracks = this.state.tracks.map((element) => {
      if (track !== element) {
        return element;
      }

      const nextLikes = track.likes + 1;

      const nextTrack = Object.assign({}, track, { likes: nextLikes });

      return nextTrack;
    });

    this.setState({ tracks: nextTracks });
  },

  render() {
    return <div>
      {this.state.tracks.map((track, index) => {
        return <Track
          incrementLikes={this.incrementLikes}
          key={index}
          track={track}
        />;
      })}
    </div>;
  }
});

export default App;
```

Then, play around with the user interface.

```shell
open http://localhost:8000/
```

### Exercise

Once the user interface is working, analyze the code and make an educated guess on how information flows between the stateful and stateless components. Write down your guess in your own words. No peaking in the next section either. The point is to make a guess now and see how close you are later. At this stage, being right or wrong doesn't matter.

## How does information flow between stateful and stateless components?

In the above code example, the responsibility of managing state and handling events is split between two different component classes—`App` and `Track` respectively.

An `<App />` component is stateful because it uses the `getInitialState()` method to initialize its state and the `this.setState()` method to change its state. Here's a diagram that represents an `<App />` component after its state is initialized.

```text
┌──────────── <App /> ───────────┐
│ ┌─────────── State ──────────┐ │
│ │ {                          │ │
│ │   tracks: [{               │ │
│ │     artist: 'The Beatles', │ │
│ │     likes: 0,              │ │
│ │     title: 'Hey Jude'      │ │
│ │   }, {                     │ │
│ │     artist: 'Adele',       │ │
│ │     likes: 0,              │ │
│ │     title: 'Hello'         │ │
│ │   }]                       │ │
│ │ }                          │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

On the other hand, a `<Track />` component is stateless because it doesn't use the `getInitialState()` method or the `this.setState()` method. Instead it receives props when it's created by an `<App />` component. Here's a diagram that represents two `<Track />` components after its props are received.

```text
┌─────────────── <Track /> ───────────────┐    ┌─────────────── <Track /> ──────────────┐
│ ┌─────────────── Props ───────────────┐ │    │ ┌─────────────── Props ──────────────┐ │
│ │ {                                   │ │    │ │ {                                  │ │
│ │   incrementLikes: incrementLikes(), │ │    │ │   incrementLikes: incrementLikes() │ │
│ │   key: 0,                           │ │    │ │   key: 1,                          │ │
│ │   track: {                          │ │    │ │   track: {                         │ │
│ │     artist: 'The Beatles',          │ │    │ │     artist: 'Adele',               │ │
│ │     likes: 0,                       │ │    │ │     likes: 0,                      │ │
│ │     title: 'Hey Jude'               │ │    │ │     title: 'Hello'                 │ │
│ │   }                                 │ │    │ │   }                                │ │
│ │ }                                   │ │    │ │ }                                  │ │
│ └─────────────────────────────────────┘ │    │ └────────────────────────────────────┘ │
└─────────────────────────────────────────┘    └────────────────────────────────────────┘
```

Being stateful, an `<App />` component is only responsible for managing a component hierarchy's state. While it could also handle a hierarchy's events, it follows the [single responsibility principal](https://en.wikipedia.org/wiki/Single_responsibility_principle) and delegates the additional responsibility to the stateless components that it owns. In React, an **owner** is a component that sets the props of another component. The following code snippet illustrates the owner-owned relationship between an `<App />` component and its `<Track />` components.

**NOTE:** The `Array.prototype.map()` method collects the returned `<Track />` components into an array. When an array is used as a component's child, its elements conveniently become individual children of that parent component.

```jsx
// app/components/app.jsx

render() {
  return <div>
    {this.state.tracks.map((track, index) => {
      return <Track
        incrementLikes={this.incrementLikes}
        key={index}
        track={track}
      />;
    })}
  </div>;
}
```

Inside the `render()` method of an `<App />` component, a new `<Track />` component is created for each track in the `this.state.tracks` array. As each component is created, its props are set. Therefore, the `<App />` component is the owner of each `<Track />` component.

Being stateless, each `<Track />` component is responsible for handling the component hierarchy's events for a single track. To handle this responsibility, the owner sets each component's `incrementLikes`, `key`, and `track`  props. With the exception of the `key` prop, these key-value pairs are accessible inside a `<Track />` component using the `this.props` object. The following code snippet illustrates a `<Track />` component accessing its props.

**NOTE:** The `key` prop is used by React to uniquely identify sibling components of the same type. If a keyed component is changed in any way, React can more efficiently update the DOM hierarchy. The `key` prop is *not* accessible via `this.props.key`.

```jsx
// From app/components/track.jsx

render() {
  return <div>
    <p>{this.props.track.title} - {this.props.track.artist}</p>

    <p>Likes: {this.props.track.likes}</p>

    <button onClick={this.handleClick}>Like</button>
  </div>;
}
```

Inside the `render()` method of a `<Track>` component, the key-value pairs of the `this.props.track` object are combined with presentation logic to produce a user interface. This user interface allows a user to view a track's information and increment its `likes` counter. When the `<button />` component is clicked, the `handleClick()` event handler method is invoked. The following code snippet illustrates the `handleClick()` method of a `<Track />` component.

```jsx
// From app/components/track.jsx

handleClick() {
  this.props.incrementLikes(this.props.track);
}
```

As you've seen, event handlers process an event and update a component's state. However, not all components have state to update, as is the case with a stateless `<Track />` component. Rather than invoking the `this.setState()` method for itself, each `<Track />` component invokes the `this.props.incrementLikes()` state mutator method from its `handleClick()` event handler.

In React, a **state mutator** is a method inside a stateful component that invokes the `this.setState()` method. The `incrementLikes()` state mutator is defined in the `<App />` component, but is passed to each `<Track />` component through its props. It's up to the `<Track />` component to determine the when to invoke it. The following code snippet illustrates the `incrementLikes()` method of an `<App />` component.

```jsx
// From app/components/app.jsx

incrementLikes(track) {
  const nextTracks = this.state.tracks.map((element) => {
    if (track !== element) {
      return element;
    }

    const nextLikes = track.likes + 1;

    const nextTrack = Object.assign({}, track, { likes: nextLikes });

    return nextTrack;
  });

  this.setState({ tracks: nextTracks });
}
```

As the name suggests, the `incrementLikes()` method increments the `likes` counter of a given `track` object. However, instead of updating a `track` object, the method creates a new `nextTracks` array that contains all the elements of the current `this.state.track` array but with one difference. The current `track` object is replaced with a new `nextTrack` object.

Using the `Object.assign()` method, a `nextTrack` object contains a copy of the key-value pairs from a `track` object merged with a copy of the key-value pairs from a `{ likes: nextLikes }` object. The following diagram illustrates the creation of a `nextTrack` object.

```text
                                                  ┌────────── track ─────────┐
                                                  │ {                        │
                                                  │   artist: 'The Beatles', │
                                        ┌─ copy ──│   likes: 0,              │
┌──────── nextTrack ───────┐   ┌────┐   │         │   title track Jude'      │
│ {                        │   │    │◀──┘         │ }                        │
│   artist: 'The Beatles', │   │    │             └──────────────────────────┘
│   likes: 1,              │ = │ {} │
│   title: 'Hey Jude'      │   │    │             ┌──────────────┐
│ }                        │   │    │◀──┐         │              │
└──────────────────────────┘   └────┘   │         │              │
                                        └─ copy ──│ { likes: 1 } │
                                                  │              │
                                                  │              │
                                                  └──────────────┘
```

This tactic of copying key-value pairs is part of a immutable data modeling strategy. An **immutable data model** is an entity or collection (e.g. object or array) whose state cannot be changed after it's created. Though it requires a bit more work on your part, an immutable data model for a stateful component can lead to significant performance gains when re-rendering a component hierarchy. You'll learn how an immutable data model can improve performance later.

The final step in resolving the `incrementLikes()` state mutator is to change the state of its component. Using the `this.setState()` method, a `nextTracks` array is merged into the current `this.state` object. After the merge, the component hierarchy, beginning with the current component, is automatically re-rendered which repeats the whole process.

In this section, we've covered a bunch of technical information about how information flows between stateful and stateless components. To summarize:

1. A stateful component's state and state mutators are passed to a stateless component's props.
1. A stateless component's props are combined with presentation logic to render a user interface.
1. An event is handled by invoking a stateless component's event handler.
1. A stateless component's event handler is processed by invoking a stateful component's state mutator.
1. A stateful component's state mutator is resolved by changing its state.
1. Repeat step 1.

Effectively, this process is another form of one-way data binding. The only difference is that it involves multiple components with separate concerns. The following diagram illustrates how one-way data binding works between stateful and stateless components.

```text
         ┌───── Automatic change ────┐
         │                           │
         │                           ▼
┌───── state ─────┐         ┌───── props ─────┐
│                 │         │                 │
│                 │         │                 │
│    Stateful     │         │    Stateless    │
│                 │         │                 │
│                 │         │                 │
└─ state mutator ─┘         └─ event handler ─┘
         ▲                           │

         └ ─ ─ ─ Manual change ─ ─ ─ ┘
```

The elegance of React's component hierarchy becomes apparent when you realize the process of one-way data binding is the same regardless of the how many components are in the hierarchy.

### Exercise

Update your previous description of how information flows between stateful and stateless components. It may be helpful to draw a few diagrams to illustrate your thoughts. After about a minute, your instructor will cold call on the class and ask what was written down.

## Summary

In this chapter, you learned how use props and state to separate the concerns of a React user interface. Specifically, you separated the concerns of a component hierarchy into stateful and stateless components. At this point, you're ready to write even more sophisticated React user interfaces.

## Assignment

- [React Inventory]()

## Resources

- [GitHub - props vs state by uberVU](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
- [React docs - Component Life Cycle](https://facebook.github.io/react/docs/component-specs.html)
- [React docs - Multiple Components](https://facebook.github.io/react/docs/multiple-components.html)

#### [⇐ Previous](03-synthetic-events.md) | [Table of Contents](README.md#table-of-contents) | [Next ⇒](05-component-life-cycle.md)
