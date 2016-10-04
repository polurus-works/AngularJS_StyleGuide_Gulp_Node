/**
*   Style Guide : Filters
*/

(function() {
    'use strict';
    angular
        .module('styleGuideApp')
        .filter('myFilter', myFilter);

    function myFilter() {
        return function() {
            return true;
        };
    }
})(); // Filters

