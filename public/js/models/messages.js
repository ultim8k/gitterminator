/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');
	var Message = require('models/message');

	var Messages = Backbone.Collection.extend({
		url: function() {
			if (!this.options || !this.options.roomId) { return '#'; }
			return '/api/rooms/' + this.options.roomId + '/messages';
		},
		model: Message,
		initialize: function (options) {
			console.log('M:Messages:init', options);
			this.options = options;
		}
	});

	return Messages;
});
