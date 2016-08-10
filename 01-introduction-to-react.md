#### [Table of Contents](README.md#table-of-contents) | [Next ⇒](02-react-tools.md)

# Introduction to React

### Objectives

- Explain what React is.
- Explain why React is important.
- Build a user interface with React.

| Duration by yourself | Duration as a class |
|----------------------|---------------------|
| About 2 hours        | About 4 hours       |

## What's React?

[React](https://facebook.github.io/react/index.html) is a JavaScript library for building sophisticated user interfaces for large, dynamic web applications. As you know, a sophisticated user interface can be hard to build and maintain. Facebook created React to try to make this process easier and faster. What's interesting about React is how different it is compared to other JavaScript solutions. In fact, React has the entire industry rethinking how to approach user interface development.

### Components hierarchy

A React user interface doesn't require many programming constructs. With React, there's no need for things like controllers, directives, or templates. In fact, all that's required is a **component** which is encapsulated code that handles presentation, state, and behavior. In other words, a component knows how it should look and act given its current underlying information. Here's a diagram that illustrates what's inside a component and the technologies it uses.

```text
┌─────────────────────────────── Component ──────────────────────────────┐
│                                                                        │
│ ┌─── Presentation ───┐  ┌─────── State ──────┐  ┌───── Behavior ─────┐ │
│ │                    │  │                    │  │                    │ │
│ │     JavaScript     │  │     JavaScript     │  │     JavaScript     │ │
│ │                    │  │                    │  │                    │ │
│ └────────────────────┘  └────────────────────┘  └────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

React builds a **hierarchy of components** and then inserts them into the DOM. Whenever a component's state changes, React will re-build the component hierarchy and update the DOM hierarchy as needed. Conceptually, it's like hitting the browser's refresh button on just the DOM elements that are out of date.

For example, imagine the following component hierarchy...

```text
          ┌─────────────┐
          │             │
          │  Component  │
          │             │
          └─────────────┘
                 │
       ┌─────────┴─────────┐
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│             │     │             │
│  Component  │     │  Component  │
│  Bulbasaur  │     │  Charizard  │
│             │     │             │
└─────────────┘     └─────────────┘
```

Represents the following DOM hierarchy.

```html
<div>
  <div>Bulbasaur</div>  
  <div>Charizard</div>
</div>
```

If the component hierarchy is later changed to this...

```text
          ┌─────────────┐
          │             │
          │  Component  │
          │             │
          └─────────────┘
                 │
       ┌─────────┴─────────┐
       │                   │
       ▼                   ▼
┌─────────────┐     ┏━━━━━━━━━━━━━┓
│             │     ┃             ┃
│  Component  │     ┃  Component  ┃
│  Bulbasaur  │     ┃  Squirtle   ┃
│             │     ┃             ┃
└─────────────┘     ┗━━━━━━━━━━━━━┛
```

Then the DOM hierarchy is changed to this.

```html
<div>
  <div>Bulbasaur</div>  
  <div>Squirtle</div>
</div>
```

Thinking about a user interface as a component hierarchy is incredibly powerful because it mirrors the hierarchical nature of the DOM. And although components have a fair number of moving parts, they're incredibly fun to use once you get the hang of React. The goal of this article is to expose you to all the moving parts of React. Don't expect everything about React to click by the end. In upcoming articles, you'll dive deeper into each moving part one at a time.

### One-way data binding

In computer science, data binding refers to the process of establishing a connection between a user interface's state and presentation. Data binding is a great way to maintain consistency without writing much code by hand.

When a user interface uses **two-way** data binding:

1. Changes to its state (e.g. data received from a server) are *immediately* propagated to the presentation.
2. Changes to its presentation (e.g. input received from a user) are *immediately* propagated to the state.

```text
         ┌───── Automatic change ────┐
         │                           │
         │                           ▼
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│                 │         │                 │
│      State      │         │   Presentation  │
│                 │         │                 │
│                 │         │                 │
└─────────────────┘         └─────────────────┘
         ▲                           │
         │                           │
         └───── Automatic change ────┘
```

Two-way data binding works great, especially for smaller user interfaces. With larger user interfaces, it's common to run into a few problems. First, it can be difficult to prevent cycles where a change to one two-way data binding causes a second data binding to change which causes the first data binding to change again. Second, two-way data bindings are expensive in terms of CPU resources. Too many of them can negatively affect a user interface's perceived speed, especially on resource-constrained mobile devices.

React avoids these problems by only using **one-way** data binding. When building a component hierarchy, its state and presentation are combined to produce a user interface. Whenever the state changes, it's automatically recombined with the presentation and a new user interface is produced.

However, changes made to the presentation are *not* automatically propagated to the state. As a developer, you'll have to write this code yourself. Fortunately, explicitly defining how this happens in React is simple and gives more control over the state that needs updating. With some practice, you'll be building, maintaining, and optimizing a sophisticated user interface like a boss.

```text
         ┌───── Automatic change ────┐
         │                           │
         │                           ▼
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│                 │         │                 │
│      State      │         │   Presentation  │
│                 │         │                 │
│                 │         │                 │
└─────────────────┘         └─────────────────┘
         ▲                           │

         └ ─ ─ ─ Manual change ─ ─ ─ ┘
```

### Exercise

Turn to a neighbor and, in your own words, explain what React is and how it's similar as well as different than Angular. It may be helpful to draw a few diagrams together to illustrate your thoughts.

## Why is React important?

When it was released in March 2013, React's approach to user interface development, using a hierarchy of components and one-way data binding, was strange and unconventional. However, developers have begun to understand the power in these techniques. And as a result, many client-side tools, including Angular, are adopting component hierarchies and one-way data binding too, helping to make them ordinary and conventional.

The following is a short list of [design principals](https://facebook.github.io/react/contributing/design-principles.html) that guide React's approach to user interface development.

- Though its concepts aren't fully mainstream, React is accessible to a wide range of developers of varying experience levels.

- React can be gradually adopted for small features and doesn't require an entire application to be rewritten with it.

- Well-designed React components can be composed together even if they're built by different people.

- When something goes wrong, React provides breadcrumbs to trace the mistake to the source of the problem.

### Exercise

Take a moment to write down why React is important. After about a minute, your instructor will cold call on the class and ask what was written down.

## How do you build a user interface with React?

Let's start by examining this simple React user interface.

`hello.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="app"></div>

    <script src="https://fb.me/react-15.3.0.js"></script>
    <script src="https://fb.me/react-dom-15.3.0.js"></script>

    <script>
      const element = React.createElement('h1', null, 'Hello world');
      const container = document.getElementById('app');

      ReactDOM.render(element, container);
    </script>
  </body>
</html>
```

It produces the following user interface.

![](https://i.imgur.com/nKBW36S.png)

### Exercise

Type out the above code example *by hand* and then run it. No copy-and-paste cheating either. Once everything is working, inspect the page in your browser's developer tools. In the **Elements** tab, you'll see something like this.

```html
<div id="app">
  <h1 data-reactroot>Hello world</h1>
</div>
```

In your own words, write down how React works in as much detail as you can. No peaking in the next section either. The point is to make a guess now and see how close you are later. At this stage, being right or wrong doesn't matter.

### How does React work?

Most of the above code should look familiar. An empty `<div id="app">` element is declared in the HTML and inserted into the DOM when the page loads. Then, the `react` and `react-dom` JavaScript libraries are loaded into the page.

Once loaded, the `React.createElement()` function is called with three arguments—a `type`, some `props`, and a `child`.

| `type`   | `props`  | `child`           |
|----------|----------|-------------------|
| `'h1'`   | `null`   | `'Hello world'`   |

The `type` tells React what kind of element to create. Next come the `props`, which is data passed into an element. You can safely ignore `props` for now. And finally, the `child` adds some content to the element. The `React.createElement()` function returns a new `ReactElement` object which is then stored in the `element` variable. It's important to note that nothing from React has been added to the DOM yet.

Then comes the `document.getElementById()` function. By now, you're familiar with how it searches the DOM for an existing element with a specific `id` attribute and returns it. The `DOMElement` is then stored in the `container` variable. Still, nothing from React has been added to the DOM.

Finally, the `ReactDOM.render()` function is called with two arguments—a `ReactElement` and a `DOMElement`.

| `ReactElement` | `DOMElement`  |
|----------------|---------------|
| `element`      |   `container` |

The `ReactDOM.render()` function uses the `ReactElement` to create a component hierarchy and then inserts it into the DOM hierarchy as the child of the `DOMElement`. The `ReactDOM.render()` function controls the contents of the `DOMElement`. Any existing content inside the `DOMElement` is replaced when the `ReactDOM.render()` function is invoked.

**NOTE:** You'll learn how React uses a reconciliation algorithm to efficiently update the contents of the `DOMElement` later.

To help learn how React works, the code example from above is extra explicit about the input and output of each React function. In a production application, the same code would be written like this.

```html
<script>
  ReactDOM.render(
    React.createElement('h1', null, 'Hello world'),
    document.getElementById('app')
  );
</script>
```

### Exercise

Update your code with the above changes. And if needed, update what you wrote earlier about how React works.

### Component presentation

Now that you've gotten some practice with the fundamentals, it's time to build a more interesting React user interface. You could use only `ReactElement` objects, but to really take advantage of React, you'll want to leverage components. Remember, a component is encapsulated code that handles presentation, state, and behavior.

Let's start by moving the presentation logic of the previous code example into a custom component. The `React.createClass()` function accepts a `specification` object and returns a component class.

`hello.html`
```html
<script>
  const App = React.createClass({
    render: function() {
      return React.createElement('h1', null, 'Hello world');
    }
  });

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
</script>
```
The `specification` object *must* implement a `render()` function that returns a single `ReactElement`. This is so important, it bears repeating. The `specification` object given to the `React.createClass()` function **must** implement a `render()` function that returns a single `ReactElement`. Otherwise, the React will throw an error.

The reason why this is so important is because the `ReactDOM.render()` function will call a component's `render()` function when it's rendering the component hierarchy. If it isn't implemented correctly, React will complain loudly by throwing an error. Also note how different a component class is from a standard, object-oriented class. You *never* explicitly call `new` to instantiate it. Again, React does that for you inside the `ReactDOM.render()` function.

The last thing to note is how `React.createElement()` only requires the `type` argument when creating a `ReactElement`. If there's no `props` or a `child` to pass into an element, they can be omitted.

### Exercise

Update your code with the above changes. Once everything is working, update your notes with what you just learned.

### Component state

Now that our component class has some presentation logic, let's spice it up by adding some state.

`hello.html`
```html
<script>
  const App = React.createClass({
    getInitialState: function() {
      return { who: 'world' };
    },

    render: function() {
      return React.createElement('h1', null, `Hello ${this.state.who}`);
    }
  });

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
</script>
```

Component classes can also define a `getInitialState()` function. It's invoked once, and only once, right before the component is **mounted** or inserted into the DOM. The function's return value is used as the initial value of `this.state`.

After the `getInitialState()` function is invoked, React will invoke the `render()` function which should be implemented as a **pure function**. In other words, it should:

1. Return the same `ReactElement` given the same component state.
1. Not modify the component's state.
1. Not read from or write directly to the DOM.
1. Not interact with the browser via functions like `setTimeout()`.

React provides other places where you can modify state or interact with the browser. Just not in the `render()` function. Keeping the `render()` function pure makes component classes easier to think about.

### Exercise

Update your code with the above changes. Once everything is working, update your notes with what you just learned.

### Component hierarchy

Now that our component class has state, let's allow the user to change that state. To start off, we'll need to add an input element to our component hierarchy.

`hello.html`
```html
<script>
  const App = React.createClass({
    getInitialState: function() {
      return { who: 'world' };
    },

    render: function() {
      return React.createElement('div', null,
        React.createElement('h1', null, `Hello ${this.state.who}`),
        React.createElement('input', { type: 'text' })
      );
    }
  });

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
</script>
```

Remember how the `React.createElement()` function accepts a `type`, some `props`, and a `child`? Well, a `child` can be either a `String` or another `ReactElement`. Neat!

In addition, an arbitrary number of children can be passed as arguments into the `React.createElement()` function. Just don't forget to pass something in for `type` and `props` first. Creating a hierarchy of `ReactElement` objects is how the `render()` function can return more than one element.

**NOTE:** The order children are passed into the `React.createElement()` function is the order they'll be mounted.

As you can see from the above code, the `props` object is made up of key-value pairs that set the HTML attributes of the element. Any HTML attribute can be a key in the `props` object so long as it's converted to camelcase. However, `class` and `for` are reserved keywords in JavaScript so `className` and `htmlFor` must be used instead.

**NOTE:** Here's an official list of the [supported HTML tags and attributes](https://facebook.github.io/react/docs/tags-and-attributes.html) in React.

### Exercise

Update your code with the above changes and run the code. Once everything is working, inspect the page in your browser's developer tools. In the **Elements** tab, you'll see something like this.

```html
<div id="app">
  <div data-reactroot>
    <h1>Hello world</h1>
    <input type="text">
  </div>
</div>
```

Now update your notes with what you just learned.

### One-way data binding

With an input element in place, let's make it dynamic by connecting changes to its value to the state inside the component. Remember, React's one-way data bindings prevent changes made to the presentation from automatically propagating to the state. We'll have to manually propagate presentation changes to the state by writing this code ourselves.

`hello.html`
```html
<script>
  const App = React.createClass({
    getInitialState: function() {
      return { who: 'world' };
    },

    handleChange: function(event) {
      const nextState = { who: event.target.value };

      this.setState(nextState);
    },

    render: function() {
      return React.createElement('div', null,
        React.createElement('h1', null, `Hello ${this.state.who}`),
        React.createElement('input', {
          onChange: this.handleChange,
          type: 'text',
          value: this.state.who
        })
      );
    }
  });

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
</script>
```

Component classes can also define custom **event handlers**. Event handlers respond to events that are fired due to a user interacting with a DOM element. To respond to events fired from a `ReactElement`, simply assign an event handler (e.g. `this.handleChange`) to a camelcase event (e.g. `onChange`) in its `props` object. Then, any time a user changes the element, the event is triggered and the event handler is invoked.

**NOTE:** Here's an official list of the [supported events](https://facebook.github.io/react/docs/events.html#supported-events) in React.

When an event handler is invoked by React, an `event` object is passed in as the first argument. The `event` object contains all the relevant information about the event that was just fired. Because of one-way data binding, it's your job to use the `event` object to update the component's state.

In the code above, both the `h1` and `input` elements need be updated to reflect what the user has typed. In other words, the component's `this.state.who` value needs to be updated. To do that, the `this.setState()` function is called with a `nextState` object. This function performs a *shallow* merge of the `nextState` object into the current `this.state` object. The resulting object is automatically reassigned back into `this.state` variable for you.

After the merge, the component is also automatically re-rendered, updating the presentation. Because of this, you *never* modify the `this.state` object directly. To change a component's state, always use the `this.setState()` function.

React thinks of components as simple state machines. A **state machine** is an object that:

1. Can be in one of a finite number of states.
1. Can transition from one state to another when an event is fired.

By thinking of a component as being in one of a finite number of transitioning states, it's easy to keep your user interface consistent. In React, you simply transition a component's state using the `this.setState()` function and it'll render a new presentation based on this new state. React efficiently changes only the parts of the DOM that need updating using a process called **reconciliation**, which you'll study later.

### Exercise

Update your code with the above changes. Once everything is working, update your notes with what you just learned.

### Component behavior

Now that our user interface responds to changes, let's expand its behavior so it's more interesting.

`hello.html`
```html
<script>
  const App = React.createClass({
    getInitialState: function() {
      return { who: 'world' };
    },

    handleChange: function(event) {
      const nextState = { who: event.target.value };

      this.setState(nextState);
    },

    render: function() {
      let message;

      if (this.state.who.trim() === '') {
        message = 'Hello?';
      }
      else {
        message = `Hello ${this.state.who}`;
      }

      return React.createElement('div', null,
        React.createElement('h1', null, message),
        React.createElement('input', {
          onChange: this.handleChange,
          type: 'text',
          value: this.state.who
        })
      );
    }
  });

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
</script>
```

The main difference in the above code example is that the `render()` function now builds up a local `message` variable which is then passed into the `h1` element as its child. Note that the `message` string is *not* part of the component's state.

A well-designed component will store the least amount of information possible in its `this.state` object. Then, inside the `render()` function, it computes other necessary information for the presentation based on its `this.state`. Adding redundant, precomputed values into the `this.state` object means you'll have to write code that explicitly keeps everything synchronized.

### Exercise

Update your code with the above changes. Once everything is working, update your notes with what you just learned.

## Summary

In this chapter, you were exposed to the fundamentals of developing React user interfaces. React is a JavaScript library for building sophisticated user interfaces using the following concepts.

1. A hierarchy of components that encapsulate presentation, state, and behavior.
2. One-way data binding where only changes to state are immediately propagated to the presentation.

## Assignment

- [Sports Ball with React](https://github.com/gSchool/wd-react-sports-ball/blob/master/sports_ball_with_react.md)

## Resources

- [React Docs - Design Principles](https://facebook.github.io/react/contributing/design-principles.html)
- [React Docs - Top Level API](https://facebook.github.io/react/docs/top-level-api.html)
- [React Docs - Component API](https://facebook.github.io/react/docs/component-api.html)
- [React Docs - Component Specs and Lifecycle](https://facebook.github.io/react/docs/component-specs.html)
- [React Docs - Tags and Attributes](https://facebook.github.io/react/docs/tags-and-attributes.html)
- [React Docs - Interactivity and Dynamic UIs](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html)
- [React Docs - Event System](https://facebook.github.io/react/docs/events.html)
- [React Docs - DOM Differences](https://facebook.github.io/react/docs/dom-differences.html)

#### [Table of Contents](README.md#table-of-contents) | [Next ⇒](02-react-tools.md)
