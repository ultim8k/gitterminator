/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var Handlebars = require('handlebars');
	var messageUTpl = require('text!templates/message.hbs');
	var messageTpl = Handlebars.compile(messageUTpl);

	var MessageItemView = Marionette.ItemView.extend({
		className: 'message',
		template: messageTpl,
		serializeData: function () {
			var messageData = this.model.toJSON();
			var userId = this.options.userId;
			if (userId && messageData.fromUser && messageData.fromUser.id == userId) {
				messageData.isOwnMessage = true;
			}

			var date = new Date(messageData.sent);
			messageData.time = date.getHours() + ':'+ date.getMinutes();
			return messageData;
		},
		onRender: function(data) {
			this.trigger('message:append:done');
		},
		initialize: function () {
			// console.log('V:MessageItemView:init', this.model);
		}
	});

	return MessageItemView;
});
