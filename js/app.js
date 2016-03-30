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
  .controller('mainController',['$scope','$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi','uibDateParser','$rootScope','$filter', function($scope, $timeout, $log, $http, GoogleMapApi,uibDateParser,$rootScope,$filter){
    $scope.check = {
      geo:true,
      add:false
    };
    $scope.runQuery = function(){                                         //on submit button click
      if($scope.map.polygons[0]){                                         //validate polygon is being used
        var poly = $rootScope.map.polygons[0];                            
        var c = '';                                                       //create cords var
        for(var i=0;i<poly.path.length;++i){                              //iterate over each lat,lon pair
          c += poly.path[i].latitude+' '+poly.path[i].longitude+',';      //save to string
        }
        c += poly.path[0].latitude+' '+poly.path[0].longitude;            //add first element to end of string to close polygon
        $scope.getData('poly',c,$scope.check,$scope.dt);                         //get data based on the polygon bounds
      }
      if($scope.map.circles[0]){                                          //validate circle is being used
        var circ = $rootScope.map.circles[0];                             
        var c = {lat:circ.center.latitude,lon:circ.center.longitude,rad:circ.radius};
        $scope.getData('circle',c,$scope.check,$scope.dt);                             
      }
    };
    $scope.noresult = true;
    $scope.getData = function(type,cords,check,date){
      var payload = [{a:type,c:cords,b:check.geo,d:check.add,e:date}];
      console.log(payload[0]);
      var url = 'https://hj4b3xg0bg.execute-api.us-west-2.amazonaws.com/prod';
      $http({
        method: 'POST',
        url: url,
        data: payload
      }).then(function successCallback(response){
        if(response.data){
          $scope.data = response.data;
          $scope.map.markers = response.data;
          $scope.showem = response.data;
          return;
        }
        $scope.noresult = false;
      });
    };
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
      $scope.showem = $scope.filteredData;
    };
    $scope.showem = [];    

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

    $rootScope.map = {
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
      bounds: {},
      circles:[],
      polygons:[]
    };
  }])
  .controller('projectController',[function(){}])
})();