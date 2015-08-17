/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var Handlebars = require('handlebars');
	var messageUTpl = require('text!templates/message.hbs');
	var messageTpl = Handlebars.compile(messageUTpl);

	var MessageItemView = Marionette.ItemView.extend({
		template: messageTpl,
		initialize: function () {
			console.log('V:MessageItemView:init');
		}
	});

	return MessageItemView;
});
