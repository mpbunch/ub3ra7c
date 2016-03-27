(function(){
  'use strict';
  angular.module('atcMap',['ngRoute','uiGmapgoogle-maps','mapSearch','mapPoly'])
  .config(['$routeProvider','uiGmapGoogleMapApiProvider',function($routeProvider,GoogleMapApi){
    $routeProvider.when('/',{
      templateUrl:'templates/home.html',
      controller:'mainController'
    }).when('/project',{
      templateUrl:'templates/project.html',
      controller:'projectController'
    });
    GoogleMapApi.configure({
      key: 'AIzaSyDB8Anfsgzn8fPF9Mv2w6yn3VlKkBgwE98',
      v: '3.17',
      libraries: 'places'
    });
  }])
  .controller('mainController',['$scope','$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', function($scope, $timeout, $log, $http, GoogleMapApi){
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term

    // create the list of sushi rolls 
    $scope.sushi = [
      { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
      { name: 'Philly', fish: 'Tuna', tastiness: 4 },
      { name: 'Tiger', fish: 'Eel', tastiness: 7 },
      { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
    ];
    
  }])
  .controller('projectController',[function(){}])
})();