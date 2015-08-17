/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');

	var User = Backbone.Model.extend({
		url: '/api/user',
		initialize: function () {
			console.log('M:User:init');
		}
	});

	return User;
});
