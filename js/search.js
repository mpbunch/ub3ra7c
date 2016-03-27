(function(window,ng){
  'use strict';
  ng.module("mapSearch", ['uiGmapgoogle-maps'])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
    $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
  }])
  .controller('WindowCtrl', function ($scope) {
    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
      $scope.place = param;
    }
  })
  .controller("mapSearchCtrlr",['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', function ($scope, $timeout, $log, $http, GoogleMapApi) {
    $log.doLog = true;
    GoogleMapApi.then(function(maps){
      maps.visualRefresh = true;
      $scope.defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.82148, -73.66450),
        new google.maps.LatLng(40.66541, -74.31715));

      $scope.map.bounds = {
        northeast:{
          latitude:$scope.defaultBounds.getNorthEast().lat()+10,
          longitude:$scope.defaultBounds.getNorthEast().lng()
        },
        southwest:{
          latitude:$scope.defaultBounds.getSouthWest().lat(),
          longitude:-$scope.defaultBounds.getSouthWest().lng()

        }
      }
      $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
    });
    angular.extend($scope,{
      window:{
        show: false,
        templateurl:'window.tpl.html',
        templateparameter:{},
        closeClick: function(){
          $scope.window.show = false;
        }
      },
      map:{
        control:{},
        center:{
          latitude: 40.74349,
          longitude: -73.990822
        },
        zoom: 12,
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
        }
      },
      searchbox:{
        template:'searchbox.tpl.html',
        options:{
          autocomplete:true,
          types:['(cities)']
        },
        events:{
          place_changed: function(autocomplete){            
            var place = autocomplete.getPlace();
            if(place.address_components){
              var newMarkers = [];
              var bounds = new google.maps.LatLngBounds();
              var marker = {
                idKey:place.place_id,
                place_id: place.place_id,
                name: place.address_components[0].long_name,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                templateurl:'window.tpl.html',
                templateparameter: place,
                events:{
                  click: function(marker){
                    $scope.window.coords = {
                      latitude: marker.model.latitude,
                      longitude: marker.model.longitude
                    }
                    $scope.window.templateparameter = marker.model.templateparameter;
                    $scope.window.show = true;

                  }
                }
              };
              newMarkers.push(marker);
              bounds.extend(place.geometry.location);
              $scope.map.bounds = {
                northeast:{
                  latitude: bounds.getNorthEast().lat(),
                  longitude: bounds.getNorthEast().lng()
                },
                southwest:{
                  latitude: bounds.getSouthWest().lat(),
                  longitude: bounds.getSouthWest().lng()
                }
              }
              $scope.map.markers = newMarkers;
            }else{
              console.log("do something else with the search string: " + place.name);
            }
          }
        }
      }
    });
  }]);
})(window,angular);