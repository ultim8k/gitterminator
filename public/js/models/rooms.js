/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');
	var Room = require('models/room');

	var Rooms = Backbone.Collection.extend({
		url: function () {
			if (!this.options || !this.options.userId) { return '#'; }
			return '/api/users/' + this.options.userId + '/rooms';
		},
		parse: function (response) {
			return response.rooms;
		},
		model: Room,
		initialize: function (options) {
			console.log('M:Rooms:init');
			_.bindAll(this, 'parse');
			this.options = options;
		}
	});

	return Rooms;
});
