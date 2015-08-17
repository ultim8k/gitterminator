/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');

	var Message = Backbone.Model.extend({
		url: '/api/messages',
		initialize: function () {
			console.log('M:Message:init');
		}
	});

	return Message;
});
