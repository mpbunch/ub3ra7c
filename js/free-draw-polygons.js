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
  .service('drawChannel',['channel',function(channel){
    return new channel()
  }])
  .service('clearChannel',['channel',function(channel){
    return new channel()
  }])
  .controller('mapWidgetCtrl', ['$scope', 'drawChannel','clearChannel', function ($scope, drawChannel, clearChannel) {
    $scope.drawWidget = {
      controlText: 'draw',
      controlClick: function () {
        drawChannel.invoke()
        console.log($scope.map)
      }
    };
    $scope.clearWidget = {
      controlText: 'clear',
      controlClick: function () {
        clearChannel.invoke()
      }
    };
  }])
  .controller('mapPolyCtrlr', ['$rootScope', '$scope',"uiGmapLogger", 'drawChannel','clearChannel',function ($rootScope, $scope, $log,drawChannel, clearChannel) {
    var clear = function(){
      $scope.map.polys = [];
    };
    var draw = function(){
      $scope.map.draw();//should be defined by now
    };
    //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
    drawChannel.add(draw);
    clearChannel.add(clear);
  }])
  .run(['$templateCache','uiGmapLogger', function ($templateCache,Logger) {
    Logger.doLog = true;
    $templateCache.put('draw.tpl.html', '<button class="btn btn-lg btn-primary"  ng-click="drawWidget.controlClick()">{{drawWidget.controlText}}</button>');
    $templateCache.put('clear.tpl.html', '<button class="btn btn-lg btn-primary"  ng-click="clearWidget.controlClick()">{{clearWidget.controlText}}</button>');
  }]);
})(window, angular);