/*global define*/
'use strict';

define(function (require) {
	var marionette = require('marionette');
	// Views
	var AppLayoutView = require('views/app-layout-view');
	var RoomsView = require('views/rooms-view');
	var MessagesView = require('views/messages-view');
	var MessageComposeView = require('views/message-compose-view');
	// Models
	var User = require('models/user');
	var Rooms = require('models/rooms');
	var Messages = require('models/messages');

	var AppController = Marionette.Object.extend({
		initialize: function () {
			// console.log('C:AppController:init');
			this.layout = new AppLayoutView();
			this.layout.render();
			var self = this;
			this.user = new User();
			this.user.fetch().done(function (data) {
				var rooms = new Rooms({
					userId: self.user.get('id')
				});
				self.layout.sidebar.show(new RoomsView({
					collection: rooms
				}));
				rooms.fetch();
			});
		},
		home: function () {
			// console.log('C:AppController:home');
			// this.layout.main.show();
			// this.layout.compose.show();
		},
		room: function (roomId) {
			var self = this;
			// console.log('C:AppController:room');
			var messages = new Messages({
				roomId: roomId
			});

			var buildMessagesView = function () {
				var messagesView = new MessagesView({
					collection: messages,
					userId: self.user.get('id')
				});
				self.layout.main.show(messagesView);
				messages.fetch();
			};

			var messageComposeView = new MessageComposeView({
				roomId: roomId
			});
			this.layout.compose.show(messageComposeView);
			if (this.user.isNew()){
				this.listenTo(this.user, 'sync', function () {
					buildMessagesView();
				});
			} else {
				buildMessagesView();
			}

			this.listenTo(messageComposeView, 'message:sent', function () {
				messages.fetch();
			});
		}
	});
	return AppController;
});
