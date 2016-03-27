(function(){
  'use strict';
  angular.module('atcMap',['ngRoute','uiGmapgoogle-maps','mapPoly','mapSearch'])
  .config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
      templateUrl:'templates/home.html',
      controller:'mainController'
    }).when('/project',{
      templateUrl:'templates/project.html',
      controller:'projectController'
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

    $scope.map = {
      control:{},
      center:{
        latitude: 40.74349,
        longitude: -73.990822
      },
      pan: true,
      zoom: 12,
      refresh: false,
      options: {
        disableDefaultUI: true
      },
      polys: [],
      draw: undefined,
      options: {
        disableDefaultUI: true
      },
      dragging: false,
      bounds:{},
      markers:[],
      idkey: 'place_id',
      events:{
        idle: function(map){

        },
        dragend: function(map){
          //update the search box bounds after dragging the map
          var bounds = map.getBounds();
          var ne = bounds.getNorthEast();
          var sw = bounds.getSouthWest(); 
          $scope.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
          //$scope.searchbox.options.visible = true;
        }
      },
      bounds: {},
    };
  }])
  .controller('projectController',[function(){}])
})();

SELECT * FROM user
WHERE Contains(
        GeomFromText(
          'POLYGON(
            (
              40.721469550114584 -74.00806903839111,
              40.71652555020213 -73.98532390594482,
              40.705497806690765 -74.00613784790039,
              40.70943417253246 -74.01678085327148,
              40.721469550114584 -74.00806903839111
            )
          )'
        ),
        PointFromText(
          CONCAT(
            'POINT(',elat,' ',elon,')'
          )
        )
      )
    && etime between '2014-04-10' and '2014-04-11';