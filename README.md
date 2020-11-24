# d2l-scroll-spy

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
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```

## Versioning & Releasing

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated, a tag and GitHub release is created and a new package will be deployed to NPM.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).
