# with-react

Ryan Sobol's React skeleton for Brunch

## Dependencies

Install the [Brunch](http://brunch.io) package globally with NPM.

```shell
npm install -g brunch
```

## Usage

Create a new application based on this Brunch skeleton and install its dependencies.

```shell
brunch new path/to/app -s ryansobol/with-react
```

Build the client-side application every time a file is changed. This also launches an HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).

```shell
npm start
```

Open the application in your default browser.

```shell
open http://localhost:8000
```

## Learn

The application's code lives in the `app` directory.

```shell
ls app
```

Static files are placed in the `app/assets` directory and are copied to the `public` directory on build.

```shell
ls app/assets
```

React components are placed in the `app/components` directory and are combined into the `public/app.js` file on build.

```shell
ls app/components
```

CSS stylesheets are placed in the `app/styles` directory and are combined into the `public/app.css` file on build.

```shell
ls app/styles
```

On each build, the client-side application files are saved to the `public` directory and served by the HTTP server.

```shell
ls public
```

## Resources

- [Brunch](http://brunch.io)
- [Getting started guide](https://github.com/brunch/brunch-guide#readme)
