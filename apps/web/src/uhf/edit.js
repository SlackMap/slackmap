angular
  .module('uhf', [])
  .filter('trust', [
    '$sce',
    function($sce) {
      return function(text) {
        return $sce.trustAsHtml(text);
      };
    },
  ])
  .controller('UhfCtrl', function($scope, $http) {
    $scope.countries = countries;
    $http
      .get(domain + '/uhf/register', {
        params: { hash: param('hash') },
      })
      .then(
        function(res) {
          if (res.data.data) {
            $scope.user = res.data.data;
            if ($scope.user.payment_id) {
              $scope.setTab('payment');
            } else {
              $scope.setTab('data');
            }
          } else {
            $scope.error = res.data.error;
          }
        },
        function(err) {
          console.error(err);
          $scope.error = err.message;
        },
      );

    $scope.ctrl = {};
    $scope.user = null;

    $scope.setTab = function(tab) {
      $scope.active = tab;
    };
    $scope.openBox = function(e) {
      $scope.lightbox = e.target.src;
    };
    $scope.boxClose = function() {
      $scope.lightbox = null;
    };
    $scope.isUnder18 = function() {
      var user = $scope.user;
      if (!user || !user.birthday) return false;
      if (user.birthday.length < 10) return false;
      var today = new Date();
      var birthDate = new Date(user.birthday + 'T13:18:23.330Z');
      var age = today.getFullYear() - birthDate.getFullYear();
      return age <= 18;
    };
    $scope.register = function() {
      $scope.submited = true;
      if (!$scope.ctrl.$form.$valid) {
        return;
      }

      if ($scope.saving) return;
      $scope.saving = true;
      $scope.update_success = null;
      $scope.update_error = null;
      $scope.ctrl.error = null;

      var url = domain+'/uhf/update';

      $http.post(url, $scope.user).then(
        function(data) {
          $scope.saving = false;
          $scope.user = data.data.data;
          $scope.update_success = true;
        },
        function(data) {
          $scope.saving = false;
          $scope.update_error = data.data;
        },
      );
    };
    $scope.cancel = function() {
      $scope.submited = true;

      if ($scope.saving) return;
      $scope.saving = true;
      $scope.update_success = null;
      $scope.update_error = null;
      $scope.ctrl.error = null;

      var url = domain+ '/uhf/delete';

      $http.post(url, $scope.user).then(
        function(data) {
          window.location = '/uhf/register.html';
        },
        function(data) {
          $scope.saving = false;
          $scope.update_error = data.data;
        },
      );
    };
    $scope.tr = function(name) {
      return tr(name, $scope.user);
    };
  });
