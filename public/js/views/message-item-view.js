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
			return messageData;
		},
		onRender: function(data) {
			console.log('V:MessageItemView:onRender', data);
		},
		initialize: function () {
			console.log('V:MessageItemView:init', this.model);
		}
	});

	return MessageItemView;
});
