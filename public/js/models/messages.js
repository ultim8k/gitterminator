/*global define*/
'use strict';

define(function (require) {
	var underscore = require('underscore');
	var backbone = require('backbone');
	var Message = require('models/message');

	var Messages = Backbone.Collection.extend({
		url: function() {
			if (!this.options || !this.options.roomId) { return '#'; }
			return '/api/rooms/' + this.options.roomId + '/messages';
		},
		model: Message,
		parse: function (response) {
			return response.messages;
		},
		initialize: function (options) {
			console.log('M:Messages:init', options);
			_.bindAll(this, 'parse');
			this.options = options;
		}
	});

	return Messages;
});
