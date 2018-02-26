var app = angular.module('app', [
  'ui.router',
  'ngAnimate',
  'ui.bootstrap'
]);

(function () {
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function (
      $stateProvider,
      $urlRouterProvider,
      $locationProvider,
    ) {



    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'topSegment': {
            templateUrl: '/static/views/partials/home/top.html',
            controller: 'homeTopController'
          },
          'bottomSegment': {
            templateUrl: '/static/views/partials/home/bottom.html',
            controller: 'homeBottomController'
          }
        }
      })
      .state('property', {
        url: '/property/:id',
        views: {
          'topSegment': {
            templateUrl: '/static/views/partials/property/top.html',
            controller: 'homeTopController'
          },
          'bottomSegment': {
            templateUrl: '/static/views/partials/home/bottom.html',
            controller: 'homeBottomController'
          }
        }
      });

      $urlRouterProvider.otherwise(
        "/home"
      );

      $locationProvider.html5Mode(true);

    }]);

})();
