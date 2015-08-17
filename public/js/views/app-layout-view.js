/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	var messengerTpl = require('text!templates/messenger.html');

	var AppLayoutView = Marionette.LayoutView.extend({
		// el: '#app',
		template: messengerTpl,
		regions: {
			sidebar: "#app_sidebar",
			main: "#app_main",
			compose: "#app_compose"
		},
		initialize: function () {
			console.log('V:AppLayoutView:init');
		}
	});

	return AppLayoutView;
});
