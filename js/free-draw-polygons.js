(function (window, ng) {
  'use strict';
  ng.module('mapPoly', ['uiGmapgoogle-maps'])
  .controller('mapWidgetCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
    $scope.drawWidget = {
      controlText: 'poly',
      controlClick: function () {
        if($rootScope.heatmap){
          $rootScope.heatmap.setMap(null);
        }
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
    };
    $scope.cricleWidget = {
      controlText: 'circle',
      controlClick: function (){
        if($rootScope.heatmap){
          $rootScope.heatmap.setMap(null);
        }
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
    };
    $scope.clearWidget = {
      controlText: 'clear',
      controlClick: function () {
        $rootScope.check.bounds = false;
        $rootScope.map.circles = [];
        $rootScope.map.polygons = [];
        $rootScope.map.markers = [];
        $rootScope.data = [];
        $rootScope.showem = [];
      }
    };
    $scope.heatWidget = {
      controlText: 'heat',
      controlClick: function () {
        $rootScope.heatmap.setMap($rootScope.heatmap.getMap() ? null : $rootScope.map.control.getGMap());
      }
    };
  }])
  .controller('mapPolyCtrlr', [function () {
    
  }])
  .run(['$templateCache','uiGmapLogger', function ($templateCache,Logger) {
    Logger.doLog = true;
    $templateCache.put('draw.tpl.html', '<button class="btn btn-lg btn-primary" ng-click="drawWidget.controlClick()">{{drawWidget.controlText}}</button>');
    $templateCache.put('clear.tpl.html', '<button class="btn btn-lg btn-primary" ng-click="clearWidget.controlClick()">{{clearWidget.controlText}}</button>');
    $templateCache.put('circle.tpl.html', '<button class="btn btn-lg btn-primary" ng-click="cricleWidget.controlClick()">{{cricleWidget.controlText}}</button>');
    $templateCache.put('heat.tpl.html', '<button class="btn btn-lg btn-primary" ng-click="heatWidget.controlClick()">{{heatWidget.controlText}}</button>');
  }]);
})(window, angular);