/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var Handlebars = require('handlebars');
	var messageComposeUTpl = require('text!templates/message-compose.hbs');
	var messageComposeTpl = Handlebars.compile(messageComposeUTpl);

	var NewMessageView = Marionette.ItemView.extend({
		template: messageComposeTpl,
		initialize: function () {
			console.log('V:NewMessageView:init');
		}
	});

	return NewMessageView;
});
