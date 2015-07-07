angular.module('charity-meow.browse.card', [])

.directive('card', function() {
    return {
      restrict: 'E',
      scope: {
        card: '='
      },
      templateUrl: 'browse/card/card.tpl.html',
      controller: function( $scope ) {
      }
    };
  })

;
