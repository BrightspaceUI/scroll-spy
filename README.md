# d2l-scroll-spy
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

Vanilla JS scroll-spy implementation and [Polymer](https://www.polymer-project.org/1.0/)-based web component for scroll points.

## Installation

`d2l-scroll-spy` can be installed from [Bower][bower-url]:
```shell
bower install d2l-scroll-spy
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support imports or web components), then import `d2l-scroll-spy.html`:

```html
<head>
	<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
	<link rel="import" href="../d2l-scroll-spy.html">
</head>
```

Scroll-spy can be used with plain vanilla JS, but a web component is provided to make set-up even easier.

Note: Scroll-spy relies on [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), so for IE11, a polyfill is required.

### Vanilla JS

```html
<body>
	...
	<div id="pt1">...</div>
	...
	<div id="pt2">...</div>
	...
</body>
```

#### Methods

```javascript
// register a scroll point (key, element, options)
D2L.ScrollSpy.registerPoint(key, element, { duration: 500, onlyOnce: spyOnce });

// unregister a scroll point
D2L.ScrollSpy.unregisterPoint(key);

// enable scroll-spy
D2L.ScrollSpy.setEnabled(bool);
```

Note: scroll-points should be unregistered when they are removed from the DOM.

#### Events

```javascript
// event that will be dispatched any time visibility of a point changes
// after the required spy duration
document.addEventListener('d2l-scroll-spy', function(e) {
	console.log(e.detail.key, e.detail.visible);
});

// event that will only be dispatched once, with no required spy duration
document.addEventListener('d2l-scroll-spy-once', function(e) {
	console.log(e.detail.key, e.detail.visible);
});
```

### Polymer

The `d2l-scroll-point` is a simple component that wraps up the scroll-point registration.  To use it, an additional import for `d2l-scroll-point.html`.

```html
<head>
	<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
	<link rel="import" href="../d2l-scroll-spy.html">
	<link rel="import" href="../d2l-scroll-point.html">
</head>
```

Enabling/disabling, and listening to events can be done same as described above.

```html
<body>
	...
	<d2l-scroll-point key="pt1">...</d2l-scroll-point>
	...
	<d2l-scroll-point key="pt2" duration="500">...</d2l-scroll-point>
	...
</body>
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run test:lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
polymer test --skip-plugin sauce
```

[bower-url]: http://bower.io/search/?q=d2l-scroll-spy
[bower-image]: https://img.shields.io/bower/v/d2l-scroll-spy.svg
[ci-image]: https://travis-ci.org/BrightspaceUI/scroll-spy.svg?branch=master
[ci-url]: https://travis-ci.org/BrightspaceUI/scroll-spy
