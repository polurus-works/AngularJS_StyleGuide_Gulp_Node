/**
*	Style Guide : run
*/

(function() {
    'use strict';

    angular
        .module('styleGuideApp')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache) {
      console.log("Style Guide Application start running");
      $rootScope.app = {};
    }

})(); // run



