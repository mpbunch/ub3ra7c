(function(){
  'use strict';
  angular.module('atcMap',['ui.bootstrap','ngRoute','uiGmapgoogle-maps','mapPoly','mapSearch'])
  .config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
      templateUrl:'templates/home.html',
      controller:'mainController'
    }).when('/project',{
      templateUrl:'templates/project.html',
      controller:'projectController'
    });   
  }])
  .controller('mainController',['$scope','$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi','uibDateParser','$rootScope','$filter', function($scope, $timeout, $log, $http, uiGmapGoogleMapApi, uibDateParser, $rootScope, $filter){
    $rootScope.check = {
      geo:true,
      add:false,
      bounds:false
    };
    $scope.runQuery = function(){                                         //on submit button click
      if($scope.check.bounds){
        var a = $scope.map.bounds;
        var c = a.northeast.latitude+' '+a.northeast.longitude+','+       //NorthEast Coords
                a.northeast.latitude+' '+a.southwest.longitude+','+       //SouthEast
                a.southwest.latitude+' '+a.southwest.longitude+','+       //SouthWest
                a.southwest.latitude+' '+a.northeast.longitude+','+       //NorthWest
                a.northeast.latitude+' '+a.northeast.longitude            //close poly by repeating northeast
        $scope.getData('bounds',c,$scope.check,$scope.dt);
        return;
      }
      if($scope.map.polygons[0]){                                         //validate polygon is being used
        var poly = $rootScope.map.polygons[0];                            
        var c = '';                                                       //create cords var
        for(var i=0;i<poly.path.length;++i){                              //iterate over each lat,lon pair
          c += poly.path[i].latitude+' '+poly.path[i].longitude+',';      //save to string
        }
        c += poly.path[0].latitude+' '+poly.path[0].longitude;            //add first element to end of string to close polygon
        $scope.getData('poly',c,$scope.check,$scope.dt);                         //get data based on the polygon bounds
        return;
      }
      if($scope.map.circles[0]){                                          //validate circle is being used
        var circ = $rootScope.map.circles[0];                             
        var c = {lat:circ.center.latitude,lon:circ.center.longitude,rad:circ.radius};
        $scope.getData('circle',c,$scope.check,$scope.dt);                             
        return;
      }
    };
    $scope.noresult = true;
    $scope.getData = function(type,cords,check,date){
      var payload = [{a:type,c:cords,b:check.geo,d:check.add,e:date}];
      var url = 'https://hj4b3xg0bg.execute-api.us-west-2.amazonaws.com/prod';
      $http({
        method: 'POST',
        url: url,
        data: payload
      }).then(function successCallback(response){
        if(response.data){
          $rootScope.data = response.data;
          $scope.map.markers = response.data;
          $rootScope.showem = response.data;
          $rootScope.map.heatLayerCallback();
          return;
        }
        $scope.noresult = false;
      });
    };
    
      
    function MockHeatLayer(heatLayer){      
      var map, pointarray, heatmap;
      $scope.uberPickup = [];
      $scope.uberDropoff = [];
      if($rootScope.heatmap){
        $rootScope.heatmap.setMap(null);
      }
      for(var i=0;i<$scope.showem.length;++i){
        $scope.uberPickup.push(new google.maps.LatLng($scope.showem[i].latitude,$scope.showem[i].longitude));
        $scope.uberDropoff.push(new google.maps.LatLng($scope.showem[i].dlatitude,$scope.showem[i].dlongitude));
      }
      $rootScope.heatmap = new google.maps.visualization.HeatmapLayer({
        data: $scope.uberPickup
      });
    }
    $scope.dt = new Date(2014, 3, 1);
    
    $scope.dateOptions = {
      dateDisabled: false,
      formatYear: 'yy',
      maxDate: new Date(2014, 8, 30),
      minDate: new Date(2014, 3, 1),
      startingDay: 0,
      showWeeks:false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.updateMap = function(){
      $rootScope.showem = $rootScope.filteredData;
    };
    $rootScope.filteredData = [];
    $rootScope.showem = [];    

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
    
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchData   = '';     // set the default search/filter term
    $scope.clearShapes = function(){
      $rootScope.map.circles = [];
      $rootScope.map.polygons = 
      $rootScope.showem = [];
      $rootScope.data = [];
      if($rootScope.heatmap){
        $rootScope.heatmap.setMap(null);
      }
    }
    $rootScope.map = {
      control:{},
      center:{
        latitude: 40.74349,
        longitude: -73.990822
      },
      pan: true,
      zoom: 12,
      refresh: false,
      polys: [],
      dragging: false,
      bounds:{},
      markers:[],
      bounds: {},
      circles:[],
      polygons:[],
      heatLayerCallback:function(layer){        
        var mockHeatLayer = new MockHeatLayer(layer);
      }
    };
//    $scope.showDirections = function(t){                                        //started to do wayfinding, where did all the time go?
//      console.log(t.latitude,t.longitude,t.dlatitude,t.dlongitude);
//    
//      uiGmapGoogleMapApi.then(function(maps){
//        var directionsService = new maps.DirectionsService();
//        var request = {
//          origin: new maps.LatLng(t.latitude,t.longitude),
//          destination: new maps.LatLng(t.dlatitude,t.longitudeng),
//          travelMode: maps.TravelMode['DRIVING'],
//          optimizeWaypoints: true
//        };
//        directionsService.route(request, function(response, status) {
//          console.log(response);
//        });
//      });
//    }
  }])
  .controller('projectController',[function(){}])
})();