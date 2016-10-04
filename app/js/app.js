/**
*   Style Guide : Routes
*/

(function(){
	'use strict';
	angular
		.module("styleGuideApp")
		.config(routesConfig);
	  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'PAGES'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, PAGES){
        
        $locationProvider.html5Mode(false);

       	/* Default Page */

        $urlRouterProvider.otherwise('/dashboard');

        /* App Routes */

        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: PAGES.DASHBOARD
        }).state('about', {
            url: '/about',
            templateUrl: PAGES.ABOUT
        });      
        
    } 
})(); // routesConfig



