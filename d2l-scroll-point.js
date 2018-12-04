/**
`d2l-scroll-point`
Polymer-based web component for D2L scroll points

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-scroll-point">
	<template strip-whitespace="">
	<slot></slot>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-scroll-point',
	properties: {
		/**
		 * Gets or sets the duration the item must be spied before trigger event.
		 */
		duration: {
			type: Number,
			reflectToAttribute: true
		},
		/**
		 * Gets or sets the scroll-point key.
		 */
		key: {
			type: String,
			reflectToAttribute: true
		},
		/**
		 * Gets or sets whether the scroll-point is only spied once.
		 */
		onceOnly: {
			type: Boolean,
			reflectToAttribute: true
		}
	},

	attached: function() {
		D2L.ScrollSpy.registerPoint(
			this.key,
			this,
			{ onceOnly: this.onceOnly, duration: this.duration }
		);
	},

	detached: function() {
		D2L.ScrollSpy.unregisterPoint(this.key);
	}

});
