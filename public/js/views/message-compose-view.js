/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var Handlebars = require('handlebars');
	var messageComposeUTpl = require('text!templates/message-compose.hbs');
	var messageComposeTpl = Handlebars.compile(messageComposeUTpl);
	var Message = require('models/message');

	var NewMessageView = Marionette.ItemView.extend({
		template: messageComposeTpl,
		events: {
			'click .js_send' : 'sendMessage'
		},
		sendMessage: function (e) {
			var self = this;
			e.preventDefault();
			var messageText = $('.js_new_message').val();
			if (!messageText || !messageText.length) {
				console.log('message empty');
				return false;
			}
			this.model.set('messageText', messageText);
			console.log(this.model.attributes);
			this.model.save().done(function () {
				$('.js_new_message').val('');
				self.trigger('message:sent');
			});
		},
		initialize: function (options) {
			console.log('V:NewMessageView:init', this.model);
			this.model = new Message({
				roomId: options.roomId
			});
		}
	});

	return NewMessageView;
});
