/**
*   Style Guide : Modules
*/

(function(){
	'use strict';
	angular
		.module("styleGuideApp",[
			'ui.router',
			'ngRoute',
			'ngCookies'			
		]);
})(); // Module


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




/**
*   Style Guide : Services
*/

// Services : ladAdminServices

(function() {
    'use strict';

    angular
        .module('styleGuideApp')
        .factory('styleGuideServices', styleGuideServices);

    styleGuideServices.$inject = ["$http", '$q', "$window", '$rootScope', '$location', 'APIS'];
    /** @ngInject */
    function styleGuideServices($http, $q, $window, $rootScope, $location, APIS) {

        var apiUrl = "http://localhost:8065/services"; //Change your local port if required

        var services = {
            getData: getData
        };

        return services;

        var modalErrMsg = function(response) {
            if (parseInt(response.status) === 403) {
                $rootScope.errorModal = true;
                $rootScope.errorCode = 403;
            } else if (parseInt(response.status) === 400) {
                $rootScope.errorModal = true;
                $rootScope.errorCode = 400;
            }
        };

        function getData() {
            var requestURL = {
                method: 'GET',
                //url: APIS.GET_DATA
                url: apiUrl + '/getData'
            };
            var responseData = function(resp) {
                 return resp;
            }
            return $http(requestURL).then(responseData, modalErrMsg);
        };


    }
})();
/**
*	Style Guide : dashboardController
*/

(function() {
    'use strict';

    angular
        .module('styleGuideApp')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$q', 'styleGuideServices'];
    
    function dashboardController($q, styleGuideServices) {
      var vm = this;
      
      activate();
      function activate(){
      	vm.styleGuide = "Hello World";
        $q.all([styleGuideServices.getData()]).then(function(promises) {
          vm.fetchData = promises[0].data.data;
          return promises;
        }); 
      }
    }

})(); // dashboardController


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

