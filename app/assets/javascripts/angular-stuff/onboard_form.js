var app = angular.module('myApp', []);
app.controller('onboardForm',
  ["$scope", '$http', '$cacheFactory', function($scope, $http, $cacheFactory) {
    $scope.still_login = null;
    $scope.login_window = null;
    $scope.callback_url = null;
    $scope.bbva_oauth = function() {
      $http({method: 'GET', url: 'https://sandbox-apis.bbvacompass.com/auth/tsec/authorize?response_type=code&client_id=app.compass.hack-fintech'})
        .then(function success(resp) {
          console.log(resp);
          var json_resp = resp.data;
        }, function error(resp) {
          console.log(resp);
        });
    };
    $scope.bbva_init = function() {
      window.open('https://sandbox-apis.bbvacompass.com/auth/tsec/authorize?response_type=code&client_id=app.compass.hack-fintech', '_BLANK');
      $scope.still_login = setInterval($scope.checkComp, 2000);
    };
    $scope.checkComp = function() {
      if (window.opener.location.href.indexOf("https://hacking-retirement.herokuapp.com/oauth/") !== -1) {
        $scope.callback_url = window.opener.location.href;
        window.opener.close();
        clearInterval($scope.still_login);
        // Grab query parameter and prefill $scope variable for TypeForm
      }
    };
    $scope.bbva_init();
  }]
);

