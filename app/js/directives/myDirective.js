/**
*   Style Guide : diretives
*/

(function() {
    'use strict';

    angular
        .module('styleGuideApp')
        .directive('myDirective', myDirective);

    myDirective.$inject = ['$rootScope','$window'];
    
  	function myDirective($rootScope,$window){
    	return {
			restrict: 'A',
			template: "My Directive Calling"
      	};
  	}
})(); //myDirective

