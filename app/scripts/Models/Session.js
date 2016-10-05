import Backbone from 'backbone';
import {hashHistory} from 'react-router';

import settings from '../settings';
import store from '../store';

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: '',
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        fullname: response.fullname,
        userId: response._id
      };
    }
  },
  retrieve: function() {
      this.fetch({
          url: `https://baas.kinvey.com/user/${settings.appKey}/_me`
      });
  },
  logout: function() {
    this.save(null, {
      url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`});
    this.clear();
    localStorage.clear();
    hashHistory.push('/');
  },
  signup: function(username, password) {
  return new Promise((resolve, reject) => {
    localStorage.clear();
    store.users.create({
      username: username,
      password: password
    }, {
      success: function(response) {
        window.localStorage.setItem('authtoken', response.get('_kmd').authtoken);
        window.localStorage.setItem('username', response.get('username'));
        response.unset('password');
        store.session.set({
          username: username
        });
        resolve(response);
      },
      error: function(response) {
        resolve();
      }
    });
  })
},
})

export default Session;
