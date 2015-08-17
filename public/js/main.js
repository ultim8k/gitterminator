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
	// var bootstrap = require('bootstrap');

	var AppController = require('application-controller');

	var Gitterminator = new Marionette.Application({
		onStart: function(options) {
			var router = new Router({
				pushState: true,
			});
		}
	});


	var Router = Marionette.AppRouter.extend({
		routes: {
			'home': 'home'
		}
	});

	var appController = new AppController();

	$(function () {
		Gitterminator.start();
	});

});
