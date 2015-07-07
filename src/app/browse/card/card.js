angular.module('charity-meow.browse.card', [])

.directive('card', function() {
  console.log("CARD");
    return {
      restrict: 'E',
      scope: {
        cardContent: '='
      },
      templateUrl: 'browse/card/card.tpl.html',
      controller: function( $scope ) {
        console.log("CARD CONTENT", $scope.cardContent);
      }
    };
  })

;
