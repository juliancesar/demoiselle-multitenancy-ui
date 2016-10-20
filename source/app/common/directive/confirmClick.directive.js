angular.module('dml')
  .directive("confirmClick", [
    function () {
      return {
        priority: -1,
        restrict: 'A',
        scope: { confirmFunction: "&confirmClick" },
        link: function (scope, element, attrs) {
          element.bind('click', function (e) {
            var message = attrs.confirmClickMessage ? attrs.confirmClickMessage : "Você tem certeza?";

            if (confirm(message)) {
              scope.confirmFunction();
            }
          });
        }
      }
    }
  ]);