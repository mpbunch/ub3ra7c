(function (window, ng) {
  'use strict';
  ng.module('mapPoly', ['uiGmapgoogle-maps'])
  .controller('mapWidgetCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
    $scope.drawWidget = {
      controlText: 'poly',
      controlClick: function () {
        if($rootScope.map.polygons.length > 0){
          $rootScope.map.polygons = [];
        }else{
          $rootScope.check.bounds = false;
          $rootScope.map.circles = [];
          $rootScope.map.polygons = [{
            id: 1,
            center: {
              latitude: $rootScope.map.center.latitude,
              longitude: $rootScope.map.center.longitude
            },
            path: [
              {
                latitude: 40.76,
                longitude: -73.999
              },
              {
                latitude: 40.71,
                longitude: -74.012
              },
              {
                latitude: 40.749,
                longitude: -73.970
              }
            ],
            stroke: {
              color: '#33CDDC',
              weight: 2,
              opacity:.8
            },
            editable: true,
            draggable: true,
            geodesic: true,
            visible: true,
            fill: {
              color: '#33CCCC',
              opacity: 0.2
            }
          }];
        }
      }
    };
    $scope.cricleWidget = {
      controlText: 'circle',
      controlClick: function (){
        if($rootScope.map.circles.length > 0){
          $rootScope.map.circles = [];
        }else{
          $rootScope.check.bounds = false;
          $rootScope.map.polygons = [];
          $rootScope.map.circles = [
            {
              id: 1,
              center: {
                latitude: $rootScope.map.center.latitude,
                longitude: $rootScope.map.center.longitude
              },
              radius: 1500,
              stroke: {
                color: '#08B21F',
                weight: 2,
                opacity: .8
              },
              fill: {
                color: '#08B21F',
                opacity: 0.2
              },
              geodesic: true,
              draggable: true,
              editable: true,
              visible: true,
            }
          ];
        }
      }
    };
    $scope.clearWidget = {
      controlClick: function () {
        $rootScope.check.bounds = false;
        $rootScope.map.circles = [];
        $rootScope.map.polygons = [];
        $rootScope.map.markers = [];
        $rootScope.data = [];
        $rootScope.showem = [];
        if($rootScope.heatmap){
          $rootScope.heatmap.setMap(null);
        }
      }
    };
    $scope.markerWidget = {
      controlClick: function (){
        $rootScope.showem.length > 0 ? $rootScope.showem = [] : $rootScope.showem = $rootScope.map.markers;
        console.log($rootScope.showem);
      }
    }
    $scope.heatWidget = {
      controlClick: function () {
        $rootScope.heatmap.setMap($rootScope.heatmap.getMap() ? null : $rootScope.map.control.getGMap());
      }
    };
  }])
  .controller('mapPolyCtrlr', [function () {
    
  }])
  .run(['$templateCache','uiGmapLogger', function ($templateCache,Logger) {
    Logger.doLog = true;
//    $templateCache.put('draw.tpl.html',   '<button type="button" class="btn btn-primary" ng-click="drawWidget.controlClick()">{{drawWidget.controlText}}</button>');
//    $templateCache.put('clear.tpl.html',  '<button type="button" class="btn btn-primary" ng-click="clearWidget.controlClick()">{{clearWidget.controlText}}</button>');
//    $templateCache.put('circle.tpl.html', '');
    $templateCache.put('controls.tpl.html',
                       '<div class="btn-group" role="group" aria-label="...">'+
                          '<button type="button" class="btn btn-default" ng-click="drawWidget.controlClick()"><i class="fa fa-object-ungroup"></i></button>'+
                          '<button type="button" class="btn btn-default" ng-click="cricleWidget.controlClick()"><i class="fa fa-circle-thin"></i></button>'+
                          '<button type="button" class="btn btn-default" ng-click="heatWidget.controlClick()" ng-if="$root.data"><i class="fa fa-fire"></i></button>'+
                          '<button type="button" class="btn btn-default" ng-click="markerWidget.controlClick()" ng-if="$root.data"><i class="fa fa-map-marker"></i></button>'+
                          '<button type="button" class="btn btn-default" ng-click="clearWidget.controlClick()" ng-if="$root.data"><i class="fa fa-trash-o"></i></button>'+
                       '</div>'
                       );
  }]);
})(window, angular);



//<div class="btn-group" role="group" aria-label="...">
//  <button type="button" class="btn btn-default">Left</button>
//  <button type="button" class="btn btn-default">Middle</button>
//  <button type="button" class="btn btn-default">Right</button>
//</div>