/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	// Views
	var AppLayoutView = require('views/app-layout-view');
	var MessagesView = require('views/messages-view');
	var MessageComposeView = require('views/message-compose-view');
	// var LandingView =  require('views/landing-view');
	// Models
	var User = require('models/user');
	var Rooms = require('models/rooms');
	var Messages = require('models/messages');

	var AppController = Marionette.Object.extend({
		initialize: function () {
			console.log('C:AppController:init');
			var appLayoutView = new AppLayoutView();
			this.layout = appLayoutView;
			appLayoutView.render();
		},
		home: function () {
			console.log('C:AppController:home');
			// this.layout.getRegion('sidebar').show();
			// this.layout.getRegion('main').show();
			// this.layout.getRegion('compose').show();
		},
		room: function (roomId) {
			console.log('C:AppController:room');
			var mesages = new Messages({
				roomId: roomId
			});
			var messagesView = new MessagesView({
				model: mesages
			});
			mesages.fetch();
			// this.layout.getRegion('sidebar').show();
			// this.layout.getRegion('main').show();
			// this.layout.getRegion('compose').show();
		}
	});
	return AppController;
});
