angular.module('charity-meow.browse.card', [])

.directive('card', function() {
    return {
      restrict: 'A',
      scope: {
        cardContent: '='
      },
      template
    }
  })

;
