var session;
try {
  session = JSON.parse(localStorage.getItem('session'));
} catch (err) {
  console.log('session decode error', err);
}
window.fbAsyncInit = function () {
  var id = (window.location.host.substring(0, 9) === 'localhost') ? 306418119377317 : 235127536543011;
  FB.init({
      appId: id,
      cookie: true,  // enable cookies to allow the server to access the session
      xfbml: false,  // parse social plugins on this page
      version: 'v2.5' // use version
  });
};
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

angular.module('uhf', [])
.filter('unique', function() {
  return function(rows) {

      let emails = {};
      rows.map( function(v) {
          emails[v.email] = 1;
      } );
      console.log(emails)
      return Object.keys(emails);
  }
})
.filter('uhf', function() {
  return function(rows, tab) {
      if(tab === 'all') {
          rows = rows
      }
      if(tab === 'guests') {
          rows = rows.filter(v=>v.guest)
      }
      if(tab === 'volunteers') {
          rows = rows.filter(v=>v.volunteer)
      }
      if(tab === 'riggers') {
          rows = rows.filter(v=>v.rigger)
      }
      if(tab === 'camping') {
          rows = rows.filter(v=>v.camping)
      }
      if(tab === 'not-finished') {
          rows = rows.filter(v=>!v.payment_id)
      }
      return rows;
  }
})
.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {

      if(session) {
        config.headers['apiToken'] = session.api_token;
      }

      return config;
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
})
.controller('UhfCtrl', function ($scope, $http, $q) {

  $scope.action = 'list';

  $scope.rows = []
  $scope.user = null
  $scope.tab = 'all'

  $scope.loadData = function () {

      $scope.saving = true;
      $http.get(domain+ '/uhf/list').then(function (data) {
          $scope.saving = false;
          $scope.rows = data.data.map(row => {
              row.id = row['@rid'].substr(4);
              return row;
          });
          $scope.doStats()

      }, function (err) {
          $scope.saving = false;
          console.log('list load error', err)
          $scope.no_row = err.statusText;
      })
  }
  $scope.selectUser = function(user) {
      if($scope.user && $scope.user.id === user.id) {
          $scope.user = null;
      } else {
          $scope.user = angular.copy(user);
      }
  }
  $scope.setCheckin = function(user) {
      let d =  new Date();
      user.checkin_at = d.toISOString();
  }
  $scope.loadData();

  $scope.login = function () {
      var options = { scope: 'email' };
      FB.login(function (response) {
          if (response.authResponse) {
              $http.post(domain+ '/uhf/fb-auth', {
                  signed_request: response.authResponse.signedRequest,
                  access_token: response.authResponse.accessToken
              }).then(function (user) {
                console.log('USER', user);
                session = user.data;
                localStorage.setItem('session', JSON.stringify(session));

                  $http.get(domain+ '/uhf/list').then(function (data) {
                      $scope.rows = data.data.map(row => {
                          row.id = row['@rid'].substr(4);
                          return row;
                      });
                      $scope.doStats()

                      $scope.no_row = null;
                  }, function (err) {
                      console.error('list load error', err)
                      $scope.no_row = err.statusText;
                  })
              }, function (err) {
                  console.error('errr', err);
              });
          } else {
              console.error({
                  detail: 'login aborted or not authorized',
                  data: response
              });

          }
      }, options);
  }

  $scope.showDeclarations = function () {
      $scope.action = 'declaration';
      $scope.rows_print = $scope.rows.filter(row => row.country_name);
  }

  $scope.showList = function () {
      $scope.action = 'list';
  }

  $scope.edit = function (row) {
      $scope.action = 'user-form';
      $scope.user = angular.copy(row);
  }

  $scope.new = function (row) {
      $scope.action = 'user-form';
      $scope.user = {};
  }

  $scope.show = function (row) {
      $scope.action = 'declaration';
      $scope.rows_print = [angular.copy(row)];
  }

  $scope.doStats = function (row) {
      var rows = $scope.rows;

      const tshirts = {
          count: 0,
          m_count: 0,
          f_count: 0,
          m_top_count:0,
          f_top_count: 0,
          m_tshirt_collected_count: 0,
          f_tshirt_collected_count: 0,
          m: {
              top: {
                  s: 0,
                  m: 0,
                  l: 0,
                  xl: 0,
                  xxl: 0
              },
              tshirt: {
                  s: 0,
                  m: 0,
                  l: 0,
                  xl: 0,
                  xxl: 0
              },
          },
          f: {
              top: {
                  xs: 0,
                  s: 0,
                  m: 0,
                  l: 0,
                  xl: 0
              },
              tshirt: {
                  xs: 0,
                  s: 0,
                  m: 0,
                  l: 0,
                  xl: 0
              }
          }
      }
      let checkin_countries = rows
      // .filter(v => v.checkin_at)
      .reduce((acc, v)=>{
              if(!acc[v.country]) {
                  acc[v.country] = {name: countries_hash[v.country], count: 0}
              }
              acc[v.country].count++
              return acc;
          }, {})
      rows.filter(v => v.tshirt_collected_gender && v.tshirt_collected_type && v.tshirt_collected_size).forEach((v)=>{
          tshirts[v.tshirt_collected_gender][v.tshirt_collected_type][v.tshirt_collected_size]++;

          tshirts['count']++;
          tshirts[v.tshirt_collected_gender+'_count']++;
          tshirts[v.tshirt_collected_gender+'_'+v.tshirt_collected_type+'_count']++;
      })
      $scope.stats = {

          total: $scope.rows.length,
          payment_id: $scope.rows.filter(v => v.payment_id).length,
          no_payment_id: $scope.rows.filter(v => !v.payment_id).length,
          ticket_full: rows.filter(v => v.ticket_type === 'full' || !v.ticket_type).length,
          ticket_weekend: rows.filter(v => v.ticket_type === 'weekend').length,
          male: rows.filter(v => v.gender === 'm').length,
          fmale: rows.filter(v => v.gender === 'f').length,
          payment_onsite_permit: rows.filter(v => v.payment_onsite_permit).length,

          campsite: rows.filter(v => v.campsite).length,
          tshirts,

          checkin: rows.filter(v => v.checkin_at).length,
          checkin_countries: Object.values(checkin_countries),
          checkin_from_online: rows.filter(v => !v.onsite && v.checkin_at).length,
          checkin_from_onsite: rows.filter(v => v.onsite && v.checkin_at).length,
          checkin_male: rows.filter(v => v.gender === 'm' && v.checkin_at).length,
          checkin_fmale: rows.filter(v => v.gender === 'f' && v.checkin_at).length,

      };
  }
  $scope.setData = function(data) {
      $scope.rows = data;
      data.forEach(row => {
        if($scope.user && $scope.user.id === row.id) {
            $scope.user = angular.copy(row);
        }
      });
      $scope.doStats();
  }
  $scope.update = function () {

      if ($scope.saving) return;
      $scope.saving = true;
      $scope.error = null;

      var url = domain+ '/uhf/list';

      $http.post(url, $scope.user).then(function (data) {
          console.log('res data', data)
          $scope.saving = false;
          $scope.user = null;
          $scope.setData(data.data)
      }, function (data) {
          $scope.saving = false;
          $scope.error = data.data.detail;
      });
  };

  $scope.onlinePayment = async function (row, payment_online, sendEmail) {

      if ($scope.online_payment_saving) return;
      $scope.online_payment_saving = true;
      $scope.error = null;

      var url = domain+ '/uhf/list/'+row.rid;

      $http.post(url, { payment_online }).then(function (data) {
          console.log('res data', data)
          $scope.online_payment_saving = false;
          $scope.setData(data.data);
      }, function (data) {
          $scope.online_payment_saving = false;
          $scope.error = data.data.detail;
      });
  };

})
