/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var Handlebars = require('handlebars');
	var roomUTpl = require('text!templates/room.hbs');
	var roomTpl = Handlebars.compile(roomUTpl);

	var RoomItemView = Marionette.ItemView.extend({
		template: roomTpl,
		initialize: function () {
			console.log('V:RoomItemView:init');
		}
	});

	return RoomItemView;
});
