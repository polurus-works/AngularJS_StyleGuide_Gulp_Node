/**
*   Style Guide : Constants
*/

(function() {
    'use strict';

    angular
        .module('styleGuideApp')
        .constant('PAGES', {
            'DASHBOARD': 'views/pages/dashboard.html',
            'ABOUT': 'views/pages/about.html'
        })
        .constant('APIS', {
            'GET_DATA': '/styleguide/services/getData'
        });
})(); // Constants


