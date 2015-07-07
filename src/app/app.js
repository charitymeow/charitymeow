angular.module( 'charity-meow', [
  'templates-app',
  'templates-common',
  'charity-meow.home',
  'charity-meow.about',
  'charity-meow.navbar',
  'charity-meow.browse',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Charity Meow' ;
    }
  });
})

;
