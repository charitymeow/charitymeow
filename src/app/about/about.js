angular.module( 'ngBoilerplate.about', [
  'ui.router',
  'placeholders'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'faq', {
    url: '/faq',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'Frequently Asked Questions' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope ) {
})

;
