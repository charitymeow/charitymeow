angular.module('ngBoilerplate.navbar', []).directive('navbar', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.links = [
        {
          state: 'home',
          text: 'Home'
        },
        {
          state: 'faq',
          text: 'FAQ'
        },
        {
          state: 'browse',
          text: 'Browse Charities'
        },
        {
          modal: 'signin',
          text: 'Sign In'
        }
      ];
    },
    templateUrl: 'navbar/navbar.tpl.html'
  };

  });
