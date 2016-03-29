(function (window, ng) {
  'use strict';
  ng.module('mapPoly', ['uiGmapgoogle-maps'])
  .factory('channel', function(){
    return function () {
      var callbacks = [];
      this.add = function (cb) {
        callbacks.push(cb);
      };
      this.invoke = function () {
        callbacks.forEach(function (cb) {
          cb();
        });
      };
      return this;
    };
  })

  .controller('mapWidgetCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
    
    $scope.drawWidget = {
      controlText: 'poly',
      controlClick: function () {
        $rootScope.map.circles = [];
        $rootScope.map.polygons = [{
          id: 1,
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
            weight: 3
          },
          editable: true,
          draggable: true,
          geodesic: false,
          visible: true,
          fill: {
            color: '#33CCCC',
            opacity: 0.8
          }
        }];
      }
    };
    $scope.cricleWidget = {
      controlText: 'circle',
      controlClick: function (){
        $rootScope.map.polygons = [];
        $rootScope.map.circles = [
          {
            id: 1,
            center: {
              latitude: 40.74349,
              longitude: -73.990822
            },
            radius: 1500,
            stroke: {
              color: '#08B21F',
              weight: 2,
              opacity: 1
            },
            fill: {
              color: '#08B21F',
              opacity: 0.5
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
        $rootScope.map.circles = [];
        $rootScope.map.polygons = [];
      }
    };
  }])
  .controller('mapPolyCtrlr', [function () {
    
  }])
  .run(['$templateCache','uiGmapLogger', function ($templateCache,Logger) {
    Logger.doLog = true;
    $templateCache.put('draw.tpl.html', '<button class="btn btn-lg btn-primary"  ng-click="drawWidget.controlClick()">{{drawWidget.controlText}}</button>');
    $templateCache.put('clear.tpl.html', '<button class="btn btn-lg btn-primary"  ng-click="clearWidget.controlClick()">{{clearWidget.controlText}}</button>');
    $templateCache.put('circle.tpl.html', '<button class="btn btn-lg btn-primary"  ng-click="cricleWidget.controlClick()">{{cricleWidget.controlText}}</button>')
  }]);
})(window, angular);