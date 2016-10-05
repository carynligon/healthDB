import $ from 'jquery';
import ReactDOM from 'react-dom';
import router from './router';

import store from './store';
import settings from './settings';

ReactDOM.render(router, document.getElementById('container'));

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1) {
    if (localStorage.getItem('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
    } else {
      xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
    }
  }
});

store.session.save({username: 'caryn', password: '1234'},
{
  success:(data) =>
  {
    console.log(data);
    localStorage.setItem('authtoken', data.get('authtoken'));
  }
});
