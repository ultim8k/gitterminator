/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var MessageItemView = require('views/message-item-view');
	var handlebars = require('handlebars');

	var messagesTpl = require('text!templates/messages.hbs');

	var MessagesView = Marionette.CompositeView.extend({
		template: messagesTpl,
		className: 'messages',
		childView: MessageItemView,
		childViewContainer: '.js_messages_list',
		childViewOptions: function () {
			return {
				userId: this.options.userId
			};
		},
		childEvents: function () {
			return {
				'message:append:done': this.messageAppendDone
			}
		},
		messageAppendDone: function () {
			var $list = this.$el;
			$list.scrollTop($list[0].scrollHeight);
		},
		initialize: function () {
			// console.log('V:MessagesView:init', this);
		}
	});

	return MessagesView;
});
