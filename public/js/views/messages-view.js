/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var MessageItemView = require('views/message-item-view');

	var MessagesView = Marionette.CollectionView.extend({
		className: 'messages media-list',
		childView: MessageItemView,
		initialize: function () {
			console.log('V:MessagesView:init');
			this.listenTo(this.collection, 'sync', function (data) {
				console.log('V:MessagesView:collection', data);
			});
		}
	});

	return MessagesView;
});
