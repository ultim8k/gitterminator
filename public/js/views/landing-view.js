/*global define*/
'use strict';

define(function (require) {
    var marionette = require('marionette');
    var Handlebars = require('handlebars');
    var landingUTpl = require('text!templates/landing.hbs');
    var landingTpl = Handlebars.compile(landingUTpl);

    var LandingView = Marionette.ItemView.extend({
        template: landingTpl,
        initialize: function () {
            console.log('V:LandingView:init');
        }
    });

    return LandingView;
});
