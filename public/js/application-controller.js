/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	// Views
	var AppLayoutView = require('views/app-layout-view');
	var RoomsView = require('views/rooms-view');
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
			this.layout = new AppLayoutView();
			this.layout.render();
		},
		home: function () {
			console.log('C:AppController:home');
			this.layout.sidebar.show(new RoomsView());
			// this.layout.main.show();
			// this.layout.compose.show();
		},
		room: function (roomId) {
			var self = this;
			console.log('C:AppController:room', this.layout.$el.html());
			var messages = new Messages({
				roomId: roomId
			});
			this.layout.sidebar.show(new RoomsView());
			this.layout.main.show(new MessagesView({
				collection: messages
			}));
			this.layout.compose.show(new MessageComposeView());
			messages.fetch();
		}
	});
	return AppController;
});
