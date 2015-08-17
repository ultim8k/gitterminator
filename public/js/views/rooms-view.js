/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var RoomItemView = require('views/room-item-view');

	var RoomsView = Marionette.CollectionView.extend({
		childView: RoomItemView,
		initialize: function () {
			console.log('V:RoomsView:init');
		}
	});

	return RoomsView;
});
