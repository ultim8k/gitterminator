/*global define*/
'use strict';

define(function (require) {
    var marionette = require('marionette');
    var AppLayoutView = require('views/app-layout-view');
    var MessagesView = require('views/messages-view');
    var LandingView =  require('views/landing-view');

    var AppController = Marionette.Object.extend({
        initialize: function () {
            console.log('C:AppController:init');
            var appLayoutView = new AppLayoutView();
            appLayoutView.render();
        },
        home: function () {

        },
        landing: function () {

        },
        createChat: function () {},
        channelChat: function (channelSlug) {}
    });
    return AppController;
});
