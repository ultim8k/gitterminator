/*global define*/
'use strict';

define(function (require) {
	var backbone = require('backbone');

	var User = Backbone.Model.extend({
		url: '/api/user',
        parse: function (response) {
            return response.user;
        },
		initialize: function () {
			console.log('M:User:init');
            _.bindAll(this, 'parse');
		}
	});

	return User;
});
