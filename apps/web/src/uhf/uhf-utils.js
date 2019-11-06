
var domain = '';

if(window.location.host.substr(0, 15) === 'localhost:8080') {
  domain = 'https://test-api.slackmap.com';
} else if(window.location.host.substr(0,15) === 'localhost:5500') {
  domain = 'https://test-api.slackmap.com';
} else if(window.location.host.substr(0,9) === 'localhost') {
  domain = 'http://localhost:3333';
} else if  (window.location.host === 'test.slackmap.com') {
  domain = 'https://test-api.slackmap.com';
} else if (window.location.host === 'stage.slackmap.com') {
  domain = 'https://stage-api.slackmap.com';
} else if (window.location.host === 'slackmap.com') {
  domain = 'https://api.slackmap.com';
}

function param(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
