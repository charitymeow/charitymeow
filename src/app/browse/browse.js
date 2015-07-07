angular.module( 'charity-meow.browse', [
  'ui.router',
  'charity-meow.browse.card'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'browse', {
    url: '/browse',
    views: {
      "main": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/browse.tpl.html'
      }
    },
    data:{ pageTitle: 'Browse Charities' }
    //TODO: RESOLVE
  });
})

.controller( 'BrowseCtrl', function BrowseCtrl( $scope, $http, $q ) {
  $q.all(_.transform(['users', 'charities', 'portfolios'], function(m, v) {
    m[v] = $http.get('assets/' + v + '.json').then(function(v) {
      return v.data;
      });
      return m;
    }, {})).then(function(allData) {
    $scope.users = allData.users;
    $scope.charities = allData.charities;
    $scope.portfolios = allData.portfolios;

    console.log("ASDF");
  });

})

;
