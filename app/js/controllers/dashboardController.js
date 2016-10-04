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

