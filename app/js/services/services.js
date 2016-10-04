/**
*   Style Guide : Services
*/

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
