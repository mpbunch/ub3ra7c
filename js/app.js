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
      box:true
    };
    $scope.runQuery = function(){                                         //on submit button click
      if($scope.map.polygons[0]){                                         //validate polygon is being used
        var poly = $rootScope.map.polygons[0];                            
        var c = '';                                                       //create cords var
        for(var i=0;i<poly.path.length;++i){                              //iterate over each lat,lon pair
          c += poly.path[i].latitude+' '+poly.path[i].longitude+',';      //save to string
        }
        c += poly.path[0].latitude+' '+poly.path[0].longitude;            //add first element to end of string to close polygon
        $scope.getData(c,$scope.check.box);                                            //get data based on the polygon bounds
      }
      if($scope.map.circles[0]){                                          //validate circle is being used
        var circ = $rootScope.map.circles[0];                             
        console.log(circ.center,circ.radius);                             
      }
    };
    
    $scope.getData = function(cords,check){
      var payload = [{c:cords,b:check}];
      var url = 'https://hj4b3xg0bg.execute-api.us-west-2.amazonaws.com/prod';
      $http({
        method: 'POST',
        url: url,
        data: payload
      }).then(function successCallback(response) {
        $scope.data = response.data;
        $scope.map.markers = response.data;
        $scope.showem = response.data;
      });
    };

    
    
    
    $scope.today = function() {
      $scope.dt = new Date(2014, 3, 1);
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = '2014-04-01';
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(2014, 3, 1),
      showWeeks: false
    };

    $scope.dateOptions = {
      dateDisabled: false,
      formatYear: 'yy',
      maxDate: new Date(2014, 8, 30),
      minDate: new Date(2014, 3, 1),
      startingDay: 0,
      showWeeks:false
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };
    
    $scope.updateMap = function(){
      $scope.showem = $scope.filteredData;
    }
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
      bounds: {}      
    };
  }])
  .controller('projectController',[function(){}])
})();