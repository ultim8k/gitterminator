/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var MessageItemView = require('views/message-item-view');

	var MessagesView = Marionette.CollectionView.extend({
		childView: MessageItemView,
		initialize: function () {
			console.log('V:MessagesView:init');
		}
	});

	return MessagesView;
});
