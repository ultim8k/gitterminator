/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');

	var Room = Backbone.Model.extend({
		url: '#',
		initialize: function () {
			// console.log('M:Room:init');
		}
	});

	return Room;
});
