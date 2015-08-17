/*global define*/
'use strict';

require.config({
	paths: {
		'text': 'vendor/text/text',
		'requirejs-text': 'vendor/requirejs-text/text',
		'jquery': 'vendor/jquery/dist/jquery.min',
		'underscore': 'vendor/underscore-amd/underscore-min',
		'backbone': 'vendor/backbone-amd/backbone-min',
		'marionette': 'vendor/marionette/lib/backbone.marionette',
		'handlebars': 'vendor/handlebars/handlebars.amd.min',
		'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js',
		'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min'
	},
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		marionette: {
			deps: ['jquery', 'underscore', 'backbone'],
			exports : 'Backbone.Marionette'
		},
		bootstrap: {
			deps: ['jquery']
		}
	}
});


define(function (require) {
	var marionette = require('marionette');
	var backbone = require('backbone');
	// var bootstrap = require('bootstrap');

	var AppController = require('application-controller');
	var Gitterminator = new Marionette.Application();
	var Router = Marionette.AppRouter.extend({
		routes: {
			'': 'root',
			'home': 'home',
			'rooms/:roomId': 'room'
		},
		initialize: function () {
			console.log('R:Router:init');
		},
		home: function () {
			console.log('R:Router:home');
			Gitterminator.controller.home();
		},
		room: function(roomId) {
			console.log('R:Router:room:'+roomId);
			Gitterminator.controller.room(roomId);
		}
	});
	Gitterminator.controller = new AppController();

	Gitterminator.router = new Router();
	Backbone.history.start({pushState: true});

	$(function () {
		Gitterminator.start();
	});

});
