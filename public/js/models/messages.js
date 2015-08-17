/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');
	var Message = require('models/message');

	var Messages = Backbone.Collection.extend({
		url: '/api/messages',
		model: Message,
		initialize: function () {
			console.log('M:Messages:init');
		}
	});

	return Messages;
});
