/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');
	var Room = require('models/room');

	var Rooms = Backbone.Collection.extend({
		url: '/api/rooms',
		model: Room,
		initialize: function () {
			console.log('M:Rooms:init');
		}
	});

	return Rooms;
});
