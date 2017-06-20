//inspired from https://gist.github.com/darlanalves/8994894
// also checkout http://www.thekuroko.com/using-angulars-log-provider/
// also checkout http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/

(function() {
'use strict';
angular.module('jtAngularPlayground')
  .config(['$provide', function($provide) {
    $provide.decorator('$log', ['$delegate',
      function($delegate) {
        var $log, enabled = true;

        $log = {
          debugEnabled: function(flag) {
            enabled = !!flag;
          }
        };

        // methods implemented by Angular's $log service
        ['log', 'warn', 'info', 'error'].forEach(function(methodName) {
          $log[methodName] = function() {
            if (!enabled)
              return;

            var args = [].slice.call(arguments);
            args[0] = [new Date().toString(), '\r\n', args[0]].join('');

            var logger = $delegate;
            logger[methodName].apply(logger, args);
          };
        });

        return $log;
      }
    ]);
  }]);
}());
