/*global define*/
'use strict';

define(function (require) {
    var marionette = require('marionette');
    var MessageItemView = require('views/message-item-view');

    var MessagesView = Marionette.CollectionView.extend({
        // el: '#app',
        // template: messengerTpl,
        // regions: {
        //     sidebar: "#app_sidebar",
        //     main: "#app_main"
        // },
        childView: MessageItemView,
        initialize: function () {
            console.log('V:MessagesView:init');
        }
    });

    return MessagesView;
});
