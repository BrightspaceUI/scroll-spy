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

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
