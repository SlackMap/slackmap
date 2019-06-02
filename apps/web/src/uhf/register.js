angular.module('uhf', [])
.filter('trust', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}])
.controller('UhfCtrl', function ($scope, $http) {
    $scope.closed = false;

    var domain = '';

    if(window.location.host === 'localhost:4200') {
      domain = 'http://localhost:3333';
    } else if (window.location.host === 'test.slackmap.com') {
      domain = 'https://test-api.slackmap.com';
    } else if (window.location.host === 'stage.slackmap.com') {
      domain = 'https://stage-api.slackmap.com';
    } else if (window.location.host === 'slackmap.com') {
      domain = 'https://api.slackmap.com';
    }
console.log('domain', domain)
    $scope.texts = {
        email: {
            tooltip: 'Email'
        },
    };

    $scope.ctrl = {
        no_header: window.top !== window,
        no_header: true
    };
    $scope.user = {
      email: 'pedro.blaszczak@gmail.com',
      language: 'en',
      guest: param('guest') ? true : false,
      volunteer: param('volunteer') ? true : false,
      "agree_mails": false,
      "agree_privacy": false
    };

    // console.log('onsite', param('onsite'))

    $scope.register = function () {
        $scope.submited = true;
        if (!$scope.ctrl.$form.$valid) {
            return;
        }

        if ($scope.saving) return;
        $scope.saving = true;
        $scope.ctrl.error = null;

        var url = domain + '/uhf/register';

        $http.post(url, $scope.user).then(function (data) {
            console.log('data',data)
            if(param('onsite')) {
                // window.location = '/uhf/edit.html?hash='+data.hash
            }
            $scope.saving = false;
            $scope.regUser = data;
        }, function (data) {
            console.log('ERR',data)
            $scope.saving = false;
            $scope.ctrl.error = data.data.message;
        });
    };

    $scope.tr = function (name) {
        return tr(name, $scope.user);
    };
})

function param(name, url) {
if (!url) url = window.location.href;
name = name.replace(/[\[\]]/g, "\\$&");
var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
if (!results) return null;
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, " "));
}
